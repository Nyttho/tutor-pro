import Crud from "./Crud.js";
import pool from "../database/db.js";

class Category extends Crud {
  constructor() {
    super("categories");
  }

  async getByName(name) {
    const query = `SELECT * FROM ${this.tableName} WHERE name = $1;`;
    const result = await pool.query(query, [name.toLowerCase()]);

    return result.rows[0] || null;
  }
}

export default new Category();
