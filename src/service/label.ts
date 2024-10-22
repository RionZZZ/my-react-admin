import { Result } from "@/types/http";
import CRUD from "./CRUD";
import http from "@/utils/request";
import { LabelData } from "@/types/label";
const url = "/asset/label";

class Label extends CRUD {
  constructor() {
    super(url);
  }

  modify(params: LabelData) {
    return http.get<LabelData, Result<unknown>>(url + "/modify", params);
  }
}

export const LabelApi = new Label();
