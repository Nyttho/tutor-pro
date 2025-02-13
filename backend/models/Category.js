import Crud from "./Crud.js";

class Category extends Crud {
  constructor() {
    super("categories");
  }
}

export default new Category();
