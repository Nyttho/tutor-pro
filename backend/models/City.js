import Crud from "./Crud.js";
import pool from "../database/db.js";

class City extends Crud {
  constructor() {
    super("cities");
  }

  async getByPostCode(country, postCode) {
    const query = `SELECT * FROM ${this.tableName} WHERE country = $1 AND post_code = $2;`;
    const result = await pool.query(query, [country, postCode]);

    return result.rows[0]
  }
}

export default new City();
