import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminPassword: localStorage.getItem('adminPassword') || "1234",
  isAdmin: false,
};

export const AdminSlice = createSlice({
  name: "admin",

  initialState: initialState,
  reducers: {
    SET_CURRENT_PASSWORD: (state, action) => {
      state.adminPassword = action.payload;
      localStorage.setItem('adminPassword', action.payload); 

    },
    SET_IS_ADMIN: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});
export const { SET_CURRENT_PASSWORD, SET_IS_ADMIN } = AdminSlice.actions;
