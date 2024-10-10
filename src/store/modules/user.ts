import { UserData } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserData = {
  deptId: null,
  email: null,
  id: null,
  phone: null,
  roleId: null,
  sex: null,
  status: null,
  userAccount: "",
  userName: "",
  userPassword: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: UserData }) => {
      return { ...state, ...payload };
    },
    resetUser: () => {
      return { ...initialState };
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
