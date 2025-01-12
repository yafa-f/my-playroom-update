import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleUser: {},
};
export const SingleUserSlice = createSlice({
  name: "singleUser",
  initialState: initialState,
  reducers: {
    setSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
  },
});

export const { setSingleUser } = SingleUserSlice.actions;
