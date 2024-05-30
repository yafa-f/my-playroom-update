import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./slices/usersSlice";

export const reduxStore = configureStore({
    reducer: {
user:UserSlice.reducer,

    }
})
