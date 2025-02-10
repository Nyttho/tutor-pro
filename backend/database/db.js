import pg from "pg";

const pool = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

export default pool;
