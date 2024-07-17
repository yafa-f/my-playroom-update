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
    ADD_FINE_FOR_MISSING_PARTS: (state, action) => {
      state.finesForMissingParts.push(action.payload);
    },
    DELETE_FINE_FOR_MISSING_PARTS: (state, action) => {
      state.finesForMissingParts = state.finesForMissingParts.filter(
        (fine) => fine._id !== action.payload._id
      );
    },
  },
});
export const {
  setFineForMissingPart,
  setFinesForMissingParts,
  ADD_FINE_FOR_MISSING_PARTS,
  DELETE_FINE_FOR_MISSING_PARTS,
} = FinesForMissingPartsSlice.actions;
