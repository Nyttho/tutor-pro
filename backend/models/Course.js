import Crud from "./Crud.js";
import pool from "../database/db.js";

class Course extends Crud {
  constructor() {
    super("courses");
  }
}

export default new Course();
