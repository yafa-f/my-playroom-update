import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./slices/usersSlice";
import { GameSlice } from "./slices/gameSlice";
import { ClosetSlice } from "./slices/closetSlice";
import { FineSlice } from "./slices/fineSlice";
import { FinesForMissingPartsSlice } from "./slices/finesForMissingPartsSlice";
// import { AgeSlice } from "./slices/forAgeSlice";
import { TypeGame, TypeGameSlice } from "./slices/typeGameSlice";

export const reduxStore = configureStore({
  reducer: {
    user: UserSlice.reducer,
    game: GameSlice.reducer,
    closet:ClosetSlice.reducer,
    fine:FineSlice.reducer,
    fineForMissingParts:FinesForMissingPartsSlice.reducer,
    // forAge:AgeSlice.reducer,
    typeGame:TypeGameSlice.reducer
  },
});
