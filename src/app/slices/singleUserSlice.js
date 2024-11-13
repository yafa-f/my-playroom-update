import { createSlice } from "@reduxjs/toolkit";

const singleUser = {};

export const SingleUserSlice = createSlice({
  name: "singleUser",
  initialState: singleUser,
  reducers: {
    setSingleUser: (state, action) => {
        state.singleUser = action.payload;

      },
  },
});
export const {setSingleUser} =
SingleUserSlice.actions;
