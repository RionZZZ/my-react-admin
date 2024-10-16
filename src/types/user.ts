import { DeleteEnum, GenderEnum, UserStatusEnum } from "./enums";

export interface UserData {
  id: number | null;
  userPassword: string;
  userName: string;
  userAccount: string;
  status: UserStatusEnum;
  roleId: number | null;
  phone: string | null;
  email: string | null;
  sex: GenderEnum | null;
  deptId: number | null;
  isDelete: DeleteEnum;
  createTime: string;
}

export type LoginField = Pick<UserData, "userAccount" | "userPassword">;

export type UserField = Partial<Pick<UserData, "userName" | "deptId">>;
