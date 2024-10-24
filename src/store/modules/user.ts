import { UserData, UserState } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: UserData }) => {
      state.userInfo = payload;
    },
    resetUser: () => {
      return { ...initialState };
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
