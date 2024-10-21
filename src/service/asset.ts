import { Result } from "@/types/http";
import http from "@/utils/request";
import CRUD from "./CRUD";
import { AssetData, AssetSearchField } from "@/types/asset";
const url = "/asset/info";

class Asset extends CRUD {
  constructor() {
    super(url);
  }

  search(params: AssetSearchField) {
    return http.get<AssetSearchField, Result<AssetData[]>>(
      url + "/getListForSearch",
      params
    );
  }
}

export const AssetApi = new Asset();
