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
    DELETE_GAME: (state, action) => {
      state.games = state.games.filter(
        (game) => game._id !== action.payload._id
      );
    },
    UPDATE_GAME: (state, action) => {
      const { _id, ...newValues } = action.payload;
      const updatedGames = state.games.map((game) => {
        if (game._id === _id) {
          return { ...game, ...newValues };
        }
        return game;
      });
      state.games = updatedGames;
    },
  },
});
export const { setCurrentGame, setGames, ADD_GAME, DELETE_GAME, UPDATE_GAME } =
  GameSlice.actions;
