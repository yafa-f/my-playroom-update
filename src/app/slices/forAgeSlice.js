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
    ADD_FOR_AGE: (state, action) => {
      state.forAges.push(action.payload);
    },
    DELETE_FOR_AGE: (state, action) => {
      state.forAges = state.forAges.filter(
        (age) => age._id !== action.payload._id
      );
    },
  },
});
export const { setCurrentForAge, setForAges, ADD_FOR_AGE, DELETE_FOR_AGE } =
  ForAgeSlice.actions;
