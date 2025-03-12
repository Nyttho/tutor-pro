import pool from "../database/db.js";

import { convertKeysToCamel, convertKeysToSnake } from "../utils/normalizers.js";


class Crud {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async create(fields) {
    const snakeFields = convertKeysToSnake(fields);
    const columns = Object.keys(snakeFields).join(", ");
    const placeholders = Object.keys(snakeFields)
      .map((_, i) => `$${i + 1}`)
      .join(", ");
    const values = Object.values(snakeFields);
  
    const query = `
          INSERT INTO ${this.tableName} (${columns})
          VALUES (${placeholders})
          RETURNING *;
        `;
  
    const result = await pool.query(query, values);
    return result.rows[0] ? convertKeysToCamel(result.rows[0]) : null;
  }

  async getAll() {
    const query = `SELECT * FROM ${this.tableName};`;
    const result = await pool.query(query);
    return result.rows.map(convertKeysToCamel);
  }

  async getById(id) {
    if (!id) {
      throw new Error("ID utilisateur invalide");
    }
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0] ? convertKeysToCamel(result.rows[0]) : null;
  }

  async update(id, fields) {
    const snakeFields = convertKeysToSnake(fields);
    const updates = Object.keys(snakeFields)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const values = [...Object.values(snakeFields), id];
  
    const query = `
          UPDATE ${this.tableName}
          SET ${updates}
          WHERE id = $${values.length}
          RETURNING *;
        `;
  
    const result = await pool.query(query, values);
    return result.rows[0] ? convertKeysToCamel(result.rows[0]) : null;
  }

async delete(id) {
  const query = `
        DELETE FROM ${this.tableName}
        WHERE id = $1
        RETURNING *;
      `;
  const result = await pool.query(query, [id]);
  return result.rows[0] ? convertKeysToCamel(result.rows[0]) : null;
}
}

export default Crud;
