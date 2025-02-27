import Crud from "./Crud.js";
import pool from "../database/db.js";
import { convertKeysToCamel } from "../utils/normalizers.js";

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
    return result.rows.map(convertKeysToCamel);
  }

  async hasOverlap(professorId, scheduledAt, duration) {
    const endAt = new Date(scheduledAt.getTime() + duration * 60000);

    const query = `
      SELECT EXISTS (
        SELECT 1 FROM ${this.tableName}
        WHERE professor_id = $1
        AND (
          (scheduled_at <= $2 AND (scheduled_at + INTERVAL '1 minute' * duration) > $2) OR
          (scheduled_at < $3 AND (scheduled_at + INTERVAL '1 minute' * duration) >= $3)
        )
      ) AS overlap;
    `;

    const result = await pool.query(query, [professorId, scheduledAt, endAt]);
    return convertKeysToCamel(result.rows[0]).overlap;
  }
}

export default new Course();
