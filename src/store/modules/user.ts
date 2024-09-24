import { UserInfo, UserState } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  userInfo: null,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, { payload }: { payload: UserInfo }) => {
      state.userInfo = payload;
    },
    setToken: (state, { payload }: { payload: UserState["token"] }) => {
      state.token = payload;
    },
    resetUser: () => {
      return { ...initialState };
    },
  },
});

export const { setUserInfo, setToken, resetUser } = userSlice.actions;
export default userSlice.reducer;
