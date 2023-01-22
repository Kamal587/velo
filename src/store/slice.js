import { createSlice } from "@reduxjs/toolkit";

const authTokenStorage = localStorage.getItem("token");

const initialState = {
  token: authTokenStorage,
};

const slice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setUser(state, action) {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      console.log(state.token);
    },
    removeUser(state, action) {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
    },
  },
});

export const { setUser, removeUser } = slice.actions;

export default slice.reducer;
