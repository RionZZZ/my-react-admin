import CRUD from "./CRUD";
const url = "/area";

class Area extends CRUD {
  constructor() {
    super(url);
  }
}

export const AreaApi = new Area();
