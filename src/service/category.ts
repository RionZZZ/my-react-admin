import CRUD from "./CRUD";
const url = "/asset/class";

class Category extends CRUD {
  constructor() {
    super(url);
  }
}

export const CategoryApi = new Category();
