import Crud from "./Crud.js";
import pool from "../database/db.js";

class Subject extends Crud {
  constructor() {
    super("subjects");
  }

  async getByName(name) {
    const query = `SELECT * FROM ${this.tableName} WHERE name = $1;`;
    const result = await pool.query(query, [name.toLowerCase()]);

    return result.rows[0] || null;
  }
}


export default new Subject();
