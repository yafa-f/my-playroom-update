import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  users: [],
};

export const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});
export const { setCurrentUser, setUsers } = UserSlice.actions;
