import { GenderEnum } from "./enums";

export interface User {
  id: number | null;
  userPassword: string;
  userName: string;
  userAccount: string;
  status: number | null;
  roleId: number | null;
  phone: string | null;
  email: string | null;
  sex: GenderEnum | null;
  deptId: number | null;
}

export interface LoginField {
  userAccount: string;
  userPassword: string;
}
