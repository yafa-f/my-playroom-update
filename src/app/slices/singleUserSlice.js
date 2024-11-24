import { createSlice } from "@reduxjs/toolkit";

const singleUser = {
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
  email:"",
};

export const SingleUserSlice = createSlice({
  name: "singleUser",
  initialState: singleUser,
  reducers: {
    setSingleUser: (state, action) => {
        state.singleUser = action.payload;

      },
  },
});
export const {setSingleUser} =
SingleUserSlice.actions;
