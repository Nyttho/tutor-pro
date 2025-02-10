import pool from "../database/db.js";

class Crud {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async create(fields) {
    const columns = Object.keys(fields).join(", ");
    const placeholders = Object.keys(fields)
      .map((_, i) => `$${i + 1}`)
      .join(", ");
    const values = Object.values(fields);

    const query = `
          INSERT INTO ${this.tableName} (${columns})
          VALUES (${placeholders})
          RETURNING *;
        `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getAll() {
    const query = `SELECT * FROM ${this.tableName};`;
    const result = await pool.query(query);
    return result.rows;
  }

  async getById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async update(id, fields) {
    const updates = Object.keys(fields)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const values = [...Object.values(fields), id];

    const query = `
          UPDATE ${this.tableName}
          SET ${updates}
          WHERE id = $${values.length}
          RETURNING *;
        `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  async delete(id) {
    const query = `
          DELETE FROM ${this.tableName}
          WHERE id = $1
          RETURNING *;
        `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}

export default Crud;
