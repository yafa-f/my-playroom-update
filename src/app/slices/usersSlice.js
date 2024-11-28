import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  users: [],
};

export const UserSlice = createSlice({
  name: "user",

  initialState: initialState,
  reducers: {
    SET_CURRENT_USER: (state, action) => {
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
    UPDATE_USER: (state, action) => {
      const { _id, ...newValues } = action.payload;
      const updatedUsers = state.users.data.map((user) => {
        if (user._id === _id) {
          return { ...user, ...newValues };
        }

        return user;
      });

      state.users.data = updatedUsers;
    },
  },
});
export const {
  SET_CURRENT_USER,
  setUsers,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
} = UserSlice.actions;
