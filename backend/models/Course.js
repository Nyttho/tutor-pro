import Crud from "./Crud.js";
import pool from "../database/db.js";

class Course extends Crud {
  constructor() {
    super("courses");
  }

  async getAllByProfessor(professorId, { year, month, week, day }) {
    let query = `SELECT * FROM ${this.tableName} WHERE professor_id = $1`;
    let params = [professorId];

    if (year) {
      query += ` AND EXTRACT(YEAR FROM scheduled_at) = $${params.length + 1}`;
      params.push(year);
    }
    if (month) {
      query += ` AND TO_CHAR(scheduled_at, 'YYYY-MM') = $${params.length + 1}`;
      params.push(month);
    }
    if (week) {
      query += ` AND EXTRACT(WEEK FROM scheduled_at) = $${params.length + 1}`;
      params.push(week);
    }
    if (day) {
      query += ` AND scheduled_at::DATE = $${params.length + 1}`;
      params.push(day);
    }

    query += " ORDER BY scheduled_at ASC";

    const result = await pool.query(query, params);
    return result.rows;
  }
}

export default new Course();
