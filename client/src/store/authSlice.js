import { createSlice } from "@reduxjs/toolkit";

// slice 초기값
const initialregistState = {
  isLogin: false,
};

// 0. slice 생성 (객체설정 필수 : name, initialState, reducers)
const authSlice = createSlice({
  name: "regist",
  initialState: initialregistState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },

    logout(state) {
      state.isLogin = false;
    },
  },
});

export default authSlice.reducer;

// 2. dispatch 설정
export const authAction = authSlice.actions;
