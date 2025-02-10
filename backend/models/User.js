import Crud from "./Crud.js";
import pool from "../database/db.js";

class User extends Crud {
  constructor() {
    super("users");
  }

  async getByEmail(email) {
    const query = `SELECT * FROM ${this.tableName} WHERE email = $1;`;
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }
}

export default new User();
