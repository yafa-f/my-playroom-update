import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentFine: {},
  fines: [],
};

export const FineSlice = createSlice({
  name: "fine",
  initialState: initialState,
  reducers: {
    setCurrentFine: (state, action) => {
      state.currentFine = action.payload;
    },
    setFines: (state, action) => {
      state.fines = action.payload;
    },
  },
});
export const { setCurrentFine, setFines } = FineSlice.actions;
