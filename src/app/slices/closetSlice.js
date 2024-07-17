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
  },
});
export const { setCurrentCloset, setClosets ,ADD_CLOSET} = ClosetSlice.actions;
