import Crud from "./Crud.js";

class Subject extends Crud {
  constructor() {
    super("subjects");
  }
}

export default new Subject();
