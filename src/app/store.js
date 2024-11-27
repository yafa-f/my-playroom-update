import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./slices/usersSlice";
import { GameSlice } from "./slices/gameSlice";
import { ClosetSlice } from "./slices/closetSlice";
import { FineSlice } from "./slices/fineSlice";
import { FinesForMissingPartsSlice } from "./slices/finesForMissingPartsSlice";
import { TypeGameSlice } from "./slices/typeGameSlice";
import { TORSlice } from "./slices/takeOrReturnSlice";
import { ForAgeSlice } from "./slices/forAgeSlice";
import { SingleUserSlice } from "./slices/singleUserSlice";
import {GamesWithMissingPartsSlice} from "./slices/gamesWiteMissingPartsSlice"
export const reduxStore = configureStore({
  reducer: {
    user: UserSlice.reducer,
    game: GameSlice.reducer,
    closet: ClosetSlice.reducer,
    fine: FineSlice.reducer,
    fineForMissingParts: FinesForMissingPartsSlice.reducer,
    typeGame: TypeGameSlice.reducer,
    takingOrReturning: TORSlice.reducer,
    forAge: ForAgeSlice.reducer,
    singleUser: SingleUserSlice.reducer,
    gamesWithMissingPart: GamesWithMissingPartsSlice.reducer

  },
});
