import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  currentSingleUser: {
    userCode: "",
    userName: "",
    userDate: "",
    phone: "",
    cellphone: "",
    depositPaid: "",
    paymentType: "",
    totalPayment: "",
    bankNumber: "",
    accountNumber: "",
    checkNumber: "",
    branchNumber: "",
    email: "",
  },
  singleUser:{}
};
export const SingleUserSlice = createSlice({
  name: "singleUser",
  initialState:initialState,
  reducers: {
    setCurrentSingleUser: (state, action) => {
      state.currentSingleUser = action.payload;
    },
    setSingleUser: (state, action) => {
        state.singleUser = action.payload;

      },
  },
});

export const {setSingleUser,setCurrentSingleUser} =
SingleUserSlice.actions;
