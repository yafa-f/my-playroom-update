import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTakeOrReturn: {},
  takingsOrReturnings: [],
};

export const TORSlice = createSlice({
  name: "takingOrReturning",

  initialState: initialState,
  reducers: {
    setCurrentTOR: (state, action) => {
      state.currentTakeOrReturn = action.payload;
    },
    setTakingOrReturning: (state, action) => {
      state.takingsOrReturnings = action.payload;
    },
  },
});
export const { setCurrentTOR, setTakingOrReturning } = TORSlice.actions;
