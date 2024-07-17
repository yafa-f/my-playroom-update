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
    ADD_USER: (state, action) => {
      state.users.data.push(action.payload);
    },
    DELETE_USER: (state, action) => {
      state.users.data = state.users.data.filter(
        (user) => user._id !== action.payload._id
      );
    },
  },
});
export const { setCurrentUser, setUsers, ADD_USER, DELETE_USER } =
  UserSlice.actions;
