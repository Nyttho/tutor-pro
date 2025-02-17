import Crud from "./Crud.js";
import pool from "../database/db.js";

class Lesson extends Crud {
  constructor() {
    super("lessons");
  }
}

export default new Lesson();
