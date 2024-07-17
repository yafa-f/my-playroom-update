import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentGame: {},
  games: [],
};

export const GameSlice = createSlice({
  name: "game",
  
  initialState: initialState,
  reducers: {
    setCurrentGame: (state, action) => {
      state.currentGame = action.payload;
    },
    setGames: (state, action) => {
      state.games = action.payload;
    },
    ADD_GAME: (state, action) => {
      state.games.push(action.payload);
    },
  },
});
export const { setCurrentGame, setGames,ADD_GAME } = GameSlice.actions;
