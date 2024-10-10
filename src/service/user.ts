import CRUD from "./CRUD";
import http from "@/utils/request";
import type { Result } from "@type/http";
import { UserData, LoginField } from "@type/user";
const url = "/user";

class User extends CRUD {
  constructor() {
    super(url);
  }
  login(params: LoginField) {
    return http.get<LoginField, Result<UserData>>(url + "/login", params);
  }
}

export const UserApi = new User();
