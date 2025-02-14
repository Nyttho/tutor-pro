import Crud from "./Crud.js";
import pool from "../database/db.js";

class Student extends Crud {
  constructor() {
    super("students");
  }
  async getByInfos(name, surname, address) {
    try {
      const result = await pool.query(
        "SELECT * FROM students WHERE name = $1 AND surname = $2 AND address = $3",
        [name, surname, address]
      );

      return result.rows[0] || null;
    } catch (err) {
      return { error: "Error while checking for student" };
    }
  }
}

export default new Student();
