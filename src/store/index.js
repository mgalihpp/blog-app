import { configureStore, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLogged: Cookies.get("userId") },
  reducers: {
    login(state) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
      Cookies.remove("userId")
    },
  },
});

export const authAction = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
