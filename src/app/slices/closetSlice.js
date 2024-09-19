import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCloset: {},
  closets: [],
};

export const ClosetSlice = createSlice({
  name: "closet",
  initialState: initialState,
  reducers: {
    setCurrentCloset: (state, action) => {
      state.currentCloset = action.payload;
    },
    setClosets: (state, action) => {
      state.closets = action.payload;
    },
    ADD_CLOSET: (state, action) => {
      state.closets.push(action.payload);
    },
    DELETE_CLOSET: (state, action) => {
      state.closets = state.closets.filter(
        (closet) => closet._id !== action.payload._id
      );
    },

    UPDATE_CLOSET: (state, action) => {
      const { _id, ...newValues } = action.payload;
      const updatedClosets = state.closets.map((closet) => {
        if (closet._id === _id) {
          return { ...closet, ...newValues };
        }
        return closet;
      });
      state.closets = updatedClosets;
    },
  },
});
export const {
  setCurrentCloset,
  setClosets,
  ADD_CLOSET,
  DELETE_CLOSET,
  UPDATE_CLOSET,
} = ClosetSlice.actions;
