import CRUD from "./CRUD";
const url = "/asset/operation";

class AssetHandle extends CRUD {
  constructor() {
    super(url);
  }
}

export const AssetHandleApi = new AssetHandle();
