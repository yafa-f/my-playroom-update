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
    UPDATE_FINE: (state, action) => {
      const { _id, ...newValues } = action.payload;
      const updatedFines = state.fines.map((fine) => {
        if (fine._id === _id) {
          return { ...fine, ...newValues };
        }
        return fine;
      });
      state.fines = updatedFines;
    },
  },
});
export const { setCurrentFine, setFines, ADD_FINE, DELETE_FINE, UPDATE_FINE } =
  FineSlice.actions;
