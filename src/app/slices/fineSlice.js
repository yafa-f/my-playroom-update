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
    ADD_FINE: (state, action) => {
      state.fines.push(action.payload);
    },
    DELETE_FINE: (state, action) => {
      state.fines = state.fines.filter(
        (fine) => fine._id !== action.payload._id
      );
    },
  },
});
export const { setCurrentFine, setFines, ADD_FINE, DELETE_FINE } =
  FineSlice.actions;
