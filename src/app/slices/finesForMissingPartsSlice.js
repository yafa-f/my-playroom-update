import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentFineForMissingParts: {},
  finesForMissingParts: [],
};

export const FinesForMissingPartsSlice = createSlice({
  name: "finesForMissingParts",

  initialState: initialState,
  reducers: {
    setFineForMissingPart: (state, action) => {
      state.currentFineForMissingParts = action.payload;
    },
    setFinesForMissingParts: (state, action) => {
      state.finesForMissingParts = action.payload;
    },
  },
});
export const { setFineForMissingPart, setFinesForMissingParts } =
  FinesForMissingPartsSlice.actions;
