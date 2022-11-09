import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";

// 1. store 생성 (어떤 reducer가 store에 저장된 state를 변경하는지 알려줌 : registSlice.reducer)
const store = configureStore({ reducer: { auth: authSlice } });

export default store;
