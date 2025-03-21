import Crud from "./Crud.js";
import pool from "../database/db.js";
import { convertKeysToCamel } from "../utils/normalizers.js";

class Lesson extends Crud {
  constructor() {
    super("lessons");
  }

  async getAll(id) {
    const query = `
      SELECT 
        lessons.id, 
        lessons.name, 
        lessons.content, 
        lessons.created_by,
        users.name AS user_name, 
        subjects.name AS subject, 
        files.file_url AS file_path, 
        links.link AS link_url,
        c.name AS category_name 
      FROM ${this.tableName}
      LEFT JOIN users ON lessons.user_id = users.id
      LEFT JOIN subjects ON lessons.subject_id = subjects.id
      LEFT JOIN files ON lessons.file_id = files.id
      LEFT JOIN links ON lessons.link_id = links.id
      LEFT JOIN categories c ON subjects.category_id = c.id
      WHERE lessons.user_id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows.map(convertKeysToCamel);
  }

  async getById(id) {
    if (!id) {
      throw new Error("ID invalide");
    }

    const query = `
      SELECT 
        lessons.id, 
        lessons.name, 
        lessons.content, 
        lessons.created_by,
        users.name AS user_name, 
        subjects.name AS subject, 
        files.file_url AS file_path, 
        links.link AS link_url,
        c.name AS category_name
      FROM ${this.tableName}
      LEFT JOIN users ON lessons.user_id = users.id
      LEFT JOIN subjects ON lessons.subject_id = subjects.id
      LEFT JOIN files ON lessons.file_id = files.id
      LEFT JOIN links ON lessons.link_id = links.id
      LEFT JOIN categories c ON subjects.category_id = c.id
      WHERE lessons.id = $1;
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0] ? convertKeysToCamel(result.rows[0]) : null;
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
