import Crud from "./Crud.js";

class File extends Crud {
  constructor() {
    super("files");
  }
}

export default new File();
