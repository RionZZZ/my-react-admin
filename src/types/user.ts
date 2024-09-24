export interface UserInfo {
  userId: string | number;
  userName: string;
}

export interface UserState {
  userInfo: UserInfo | null;
  token?: string;
}
