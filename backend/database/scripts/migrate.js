import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Récupère le chemin absolu du dossier courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MIGRATIONS_DIR = path.join(__dirname, "..", "migrations");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function ensureMigrationsTable() {
  await client.query(`
        CREATE TABLE IF NOT EXISTS migrations (
            id SERIAL PRIMARY KEY,
            filename VARCHAR(255) UNIQUE NOT NULL,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

async function getMigrationFiles() {
  const entries = await fs.readdir(MIGRATIONS_DIR);
  return entries.filter((file) => file.endsWith(".sql")).sort();
}

async function hasMigrationRun(filename) {
  const res = await client.query(
    "SELECT 1 FROM migrations WHERE filename = $1",
    [filename]
  );
  return res.rowCount > 0;
}

async function runMigration(file) {
  const filePath = path.join(MIGRATIONS_DIR, file);
  const sql = await fs.readFile(filePath, "utf-8");

  try {
    console.log(`🟢 Exécution : ${file}`);
    await client.query("BEGIN");
    await client.query(sql);
    await client.query("INSERT INTO migrations (filename) VALUES ($1)", [file]);
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw new Error(`Erreur dans ${file}: ${err.message}`);
  }
}

async function migrate() {
  try {
    await client.connect();
    await ensureMigrationsTable();

    const files = await getMigrationFiles();
    for (const file of files) {
      const alreadyRun = await hasMigrationRun(file);
      if (alreadyRun) {
        console.log(`🟡 Déjà appliqué : ${file}`);
        continue;
      }

      await runMigration(file);
    }

    console.log("✅ Toutes les migrations ont été exécutées.");
  } catch (err) {
    console.error("❌ Migration échouée :", err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
