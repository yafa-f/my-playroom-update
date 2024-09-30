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
    ADD_TOR: (state, action) => {
      state.takingsOrReturnings.push(action.payload);
    },
    DELETE_TOR: (state, action) => {
      state.takingsOrReturnings = state.takingsOrReturnings.filter(
        (tOr) => tOr._id !== action.payload._id
      );
    },
    UPDATE_TOR: (state, action) => {
      const { _id, ...newValues } = action.payload;
      const updatedTors = state.takingsOrReturnings.map((tOr) => {
        if (tOr._id === _id) {
          return { ...tOr, ...newValues };
        }
        return tOr;
      });
      state.takingsOrReturnings = updatedTors;
    },
  },
});
export const {
  setCurrentTOR,
  setTakingOrReturning,
  ADD_TOR,
  DELETE_TOR,
  UPDATE_TOR,
} = TORSlice.actions;
