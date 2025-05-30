import Crud from "./Crud.js";
import pool from "../database/db.js";
import { convertKeysToCamel } from "../utils/normalizers.js";

class Course extends Crud {
  constructor() {
    super("courses");
  }

  async getAllByProfessor(professorId, { year, month, week, day }) {
    let query = `
    SELECT 
      c.*, 
      s.name AS student_name, 
      s.surname AS student_surname 
    FROM ${this.tableName} c
    LEFT JOIN students s ON c.student_id = s.id
    WHERE c.professor_id = $1
  `;
    const params = [professorId];

    if (year && month && day) {
      // ✅ Formate correctement la date sans toISOString()
      const paddedMonth = String(month).padStart(2, "0");
      const paddedDay = String(day).padStart(2, "0");
      const formattedDate = `${year}-${paddedMonth}-${paddedDay}`;

      query += ` AND c.scheduled_at::DATE = $${params.length + 1}`;
      params.push(formattedDate);
    } else {
      if (year) {
        query += ` AND EXTRACT(YEAR FROM c.scheduled_at) = $${
          params.length + 1
        }`;
        params.push(year);
      }
      if (month) {
        const formattedMonth = String(month).padStart(2, "0");
        query += ` AND TO_CHAR(c.scheduled_at, 'MM') = $${params.length + 1}`;
        params.push(formattedMonth);
      }
      if (week) {
        query += ` AND EXTRACT(WEEK FROM c.scheduled_at) = $${
          params.length + 1
        }`;
        params.push(week);
      }
    }

    query += " ORDER BY c.scheduled_at ASC";

    try {
      const result = await pool.query(query, params);
      return result.rows.map(convertKeysToCamel);
    } catch (err) {
      console.error("Erreur lors de l'exécution de la requête", err);
      throw new Error("Échec de la requête à la base de données");
    }
  }

  async getNextCourses(professorId, limit) {
    const query = `
      SELECT 
        c.*,
        s.name AS student_name, 
        s.surname AS student_surname 
      FROM ${this.tableName} c
      LEFT JOIN students s ON c.student_id = s.id
      WHERE scheduled_at > NOW() AND c.professor_id = $1
      ORDER BY scheduled_at ASC
      LIMIT ${limit};
    `;
    const params = professorId;
    try {
      const result = await pool.query(query, [params]);
      return result.rows.map(convertKeysToCamel);
    } catch (err) {
      console.error("Erreur lors de l'exécution de la requête", err);
      throw new Error("Échec de la requête à la base de données");
    }
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

  async hasOverlapExcludingCourse(
    professorId,
    scheduledAt,
    duration,
    excludeCourseId
  ) {
    const endAt = new Date(scheduledAt.getTime() + duration * 60000);

    const query = `
    SELECT EXISTS (
      SELECT 1 FROM ${this.tableName}
      WHERE professor_id = $1
      AND id != $4
      AND (
        (scheduled_at <= $2 AND (scheduled_at + INTERVAL '1 minute' * duration) > $2) OR
        (scheduled_at < $3 AND (scheduled_at + INTERVAL '1 minute' * duration) >= $3)
      )
    ) AS overlap;
  `;

    const result = await pool.query(query, [
      professorId,
      scheduledAt,
      endAt,
      excludeCourseId,
    ]);
    return convertKeysToCamel(result.rows[0]).overlap;
  }
}

export default new Course();
