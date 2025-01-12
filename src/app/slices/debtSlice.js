import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDebt: {},
  debts: [],
};

export const DebtSlice = createSlice({
  name: "debt",
  initialState: initialState,
  reducers: {
    setCurrentDebt: (state, action) => {
      state.currentDebt = action.payload;
    },
    setDebts: (state, action) => {
      state.debts = action.payload;
    },
    ADD_DEBT: (state, action) => {
      state.debts.push(action.payload);
    },
    DELETE_DEBT: (state, action) => {
      state.debts = state.fines.filter(
        (fine) => fine._id !== action.payload._id
      );
    },
    UPDATE_DEBT: (state, action) => {
      const { _id, ...newValues } = action.payload;
      const updatedDebts = state.debts.map((deb) => {
        if (deb._id === _id) {
          return { ...deb, ...newValues };
        }
        return deb;
      });
      state.debts = updatedDebts;
    },
  },
});
export const { setCurrentDebt, setDebts, ADD_DEBT, DELETE_DEBT, UPDATE_DEBT } =
  DebtSlice.actions;
