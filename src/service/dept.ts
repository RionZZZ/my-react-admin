import CRUD from "./CRUD";
const url = "/dept";

class Dept extends CRUD {
  constructor() {
    super(url);
  }
}

export const DeptApi = new Dept();
