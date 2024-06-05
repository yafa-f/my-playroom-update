import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentForAge: {},
  forAges: [],
};
export const ForAgeSlice = createSlice({
  name: "forAge",
  initialState: initialState,
  reducers: {
    setCurrentForAge: (state, action) => {
      state.currentForAge = action.payload;
    },
    setForAges: (state, action) => {
      state.forAges = action.payload;
    },
  },
});
export const { setCurrentForAge, setForAges } = ForAgeSlice.actions;