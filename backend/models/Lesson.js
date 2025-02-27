import Crud from "./Crud.js";
import pool from "../database/db.js";
import { convertKeysToCamel } from "../utils/normalizers.js";

class Lesson extends Crud {
  constructor() {
    super("lessons");
  }
  async getBySubject(subjectId, userId) {
    try {
      const query = `SELECT * FROM lessons WHERE subject_id = $1 AND user_id = $2;`;
      const result = await pool.query(query, [subjectId, userId]);
      return result.rows[0] ? convertKeysToCamel(result.rows[0]) : null;
    } catch (err) {
      return { error: "Error while checking for lessons" };
    }
  }
}

export default new Lesson();
