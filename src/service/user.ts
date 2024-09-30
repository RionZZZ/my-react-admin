import CRUD from "./CRUD";
// import http from "@/utils/request";
import type { Result } from "@type/http";
import { User as UserData, LoginField, UserState } from "@type/user";
const url = "/user";

class User extends CRUD {
  constructor() {
    super(url);
  }
  login(params: LoginField) {
    // return http.get<LoginField, Result<UserData>>(url + "/login", params);
    return new Promise((resolve) => {
      console.log(params);
      setTimeout(() => {
        resolve({
          msg: "msg",
          code: 0,
          obj: {
            token: "123123123",
            userInfo: { userId: "1", userName: "Rion" },
          },
        });
      }, 2000);
    }) as Promise<Result<UserState>>;
  }
}

export const UserApi = new User();
