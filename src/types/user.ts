import { DeleteEnum, GenderEnum, UserStatusEnum } from "./enums";

export interface UserData {
  id: number;
  userPassword: string;
  userName: string;
  userAccount: string;
  status: UserStatusEnum;
  roleId: number;
  phone: string;
  email: string;
  sex: GenderEnum;
  deptId: number;
  isDelete: DeleteEnum;
}

export interface UserState {
  userInfo: Nullable<UserData>;
}

export type LoginField = Pick<UserData, "userAccount" | "userPassword">;

export type UserField = Partial<Pick<UserData, "userName" | "deptId">>;
