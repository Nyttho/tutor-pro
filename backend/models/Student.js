import Crud from "./Crud.js";
import pool from "../database/db.js";
import { convertKeysToCamel } from "../utils/normalizers.js";
class Student extends Crud {
  constructor() {
    super("students");
  }

  async getById(id) {
    try {
      const result = await pool.query(
        `SELECT 
          s.*,
          json_build_object(
            'country', ci.country,
            'name', ci.name,
            'postCode', ci.post_code
          ) AS city,
          COUNT(c.id) AS total_courses,
          COUNT(CASE WHEN c.status = 'pending' THEN 1 END) AS pending_courses
        FROM students s
        LEFT JOIN cities ci ON ci.id = s.city_id
        LEFT JOIN courses c ON c.student_id = s.id
        WHERE s.id = $1
        GROUP BY s.id, ci.id`,
        [id]
      );

      return result.rows[0] ? convertKeysToCamel(result.rows[0]) : null;
    } catch (err) {
      throw new Error("Error while fetching student data");
    }
  }

  async getByInfos(name, surname, address) {
    try {
      const result = await pool.query(
        "SELECT * FROM students WHERE name = $1 AND surname = $2 AND address = $3",
        [name, surname, address]
      );

      return result.rows[0] ? convertKeysToCamel(result.rows[0]) : null;
    } catch (err) {
      return { error: "Error while checking for student" };
    }
  }

  async getByProfessorId(id) {
    try {
      const result = await pool.query(
        `SELECT 
          s.*,
          json_build_object(
            'country', ci.country,
            'name', ci.name,
            'postCode', ci.post_code
          ) AS city,
          COUNT(c.id) AS total_courses,
          COUNT(CASE WHEN c.status = 'pending' THEN 1 END) AS pending_courses
        FROM students s
        LEFT JOIN cities ci ON ci.id = s.city_id
        LEFT JOIN courses c ON c.student_id = s.id
        WHERE s.created_by = $1
        GROUP BY s.id, ci.id`,
        [id]
      );
      return result.rows.map(convertKeysToCamel);
    } catch (err) {
      return { error: "Error while checking for students" };
    }
  }
  async delete(studentId) {
    try {
      const result = await pool.query(
        "UPDATE students SET is_deleted = TRUE WHERE id = $1 RETURNING *",
        [studentId]
      );

      return result.rowCount > 0; // Renvoie `true` si au moins une ligne a été mise à jour, sinon `false`
    } catch (err) {
      throw new Error("Error while deleting student");
    }
  }
}

export default new Student();
