import Crud from "./Crud.js";
import pool from "../database/db.js";

class Student extends Crud {
    constructor(){
        super('students');
    }
}

export default new Student();