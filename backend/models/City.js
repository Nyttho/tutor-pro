import Crud from "./Crud.js";
import pool from "../database/db.js";

class City extends Crud {
  constructor() {
    super("cities");
  }

  async getByName(country, postCode, name) {
    const query = `SELECT * FROM ${this.tableName} WHERE country = $1 AND post_code = $2 AND name LIKE $3;`;
    const result = await pool.query(query, [country, postCode, name]);
  }
}

export default new City();
