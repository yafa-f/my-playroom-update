
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {UserSlice} from "./slices/usersSlice";
import {GameSlice} from "./slices/gameSlice";
import {ClosetSlice} from "./slices/closetSlice";
import {FineSlice} from "./slices/fineSlice";
import {FinesForMissingPartsSlice} from "./slices/finesForMissingPartsSlice";
import {TypeGameSlice} from "./slices/typeGameSlice";
import {TORSlice} from "./slices/takeOrReturnSlice";
import {ForAgeSlice} from "./slices/forAgeSlice";
import {SingleUserSlice} from "./slices/singleUserSlice";
import {GamesWithMissingPartsSlice} from "./slices/gamesWiteMissingPartsSlice";
import { AdminSlice } from "./slices/adminSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = {
  user: UserSlice.reducer,
  game: GameSlice.reducer,
  closet: ClosetSlice.reducer,
  fine: FineSlice.reducer,
  fineForMissingParts: FinesForMissingPartsSlice.reducer,
  typeGame: TypeGameSlice.reducer,
  takingOrReturning: TORSlice.reducer,
  forAge: ForAgeSlice.reducer,
  singleUser: persistReducer(persistConfig, SingleUserSlice.reducer),
  gamesWithMissingPart: GamesWithMissingPartsSlice.reducer,
  admin:AdminSlice.reducer
};

export const reduxStore = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(reduxStore);