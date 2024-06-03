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
  },
});
export const { setCurrentCloset, setClosets } = ClosetSlice.actions;
