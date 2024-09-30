export interface UserInfo {
  userId: string | number;
  userName: string;
}

export interface UserState {
  userInfo: UserInfo | null;
  token?: string;
}

export interface User {
  id: number;
  userPassword: string;
  userName: string;
  userAccount: string;
  status: number;
  roleId: number;
}

export interface LoginField {
  userName: string;
  password: string;
}
