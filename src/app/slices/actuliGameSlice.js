import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentActualiGame: {},
  actualiGames: [],
};

export const ActuliGameSlice = createSlice({
  name: "actualiGame",
  initialState: initialState,
  reducers: {
    setActualiGame: (state, action) => {
      state.currentActualiGame = action.payload;
    },
    setActualiGames: (state, action) => {
      state.actualiGames = action.payload;
    },
    ADD_ACTUALI_GAME: (state, action) => {
      state.actualiGames.push(action.payload);
    },
    DELETE_ACTUALI_GAME: (state, action) => {
      state.actualiGames = state.actualiGames.filter(
        (game) => game._id !== action.payload._id
      );
    },
    UPDATE_ACTUALI_GAME: (state, action) => {
      const { _id, ...newValues } = action.payload;
      const updatedActualiGames = state.actualiGames.map((game) => {
        if (game._id === _id) {
          return { ...game, ...newValues };
        }
        return game;
      });
      state.actualiGames = updatedActualiGames;
    },
  },
});

export const {
  setActualiGame,
  setActualiGames,
  ADD_ACTUALI_GAME,
  DELETE_ACTUALI_GAME,
  UPDATE_ACTUALI_GAME,
} = ActuliGameSlice.actions;
