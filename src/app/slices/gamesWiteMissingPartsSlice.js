import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentGamesWithMissingParts: {},
  gamesWithMissingParts: [],
};
export const GamesWithMissingPartsSlice = createSlice({
  name: "gamesWithMissingPart",
  initialState: initialState,
  reducers: {
    setCurrentGamesWithMissingParts: (state, action) => {
      state.currentGamesWithMissingParts = action.payload;
    },
    setGamesWithMissingParts: (state, action) => {
      state.gamesWithMissingParts = action.payload;
    },
    ADD_GAMES_WITH_MISSING_PARTS: (state, action) => {
      state.gamesWithMissingParts.push(action.payload);
    },
    DELETE_GAMES_WITH_MISSING_PARTS: (state, action) => {
      state.gamesWithMissingParts = state.gamesWithMissingParts.filter(
        (game) => game._id !== action.payload._id
      );
    },
    UPDATE_GAMES_WITH_MISSING_PARTS: (state, action) => {
      const { Id, ...newValues } = action.payload;
      const updatedGamesWithMissingParts = state.gamesWithMissingParts.data.map((game) => {
        if (game.Id === Id) {
          return { ...game, ...newValues };
        }
        return game;
      });
      state.gamesWithMissingParts.data = updatedGamesWithMissingParts;
    },
  },
});
export const {
    setCurrentGamesWithMissingParts,
    setGamesWithMissingParts,
    ADD_GAMES_WITH_MISSING_PARTS,
    DELETE_GAMES_WITH_MISSING_PARTS,
    UPDATE_GAMES_WITH_MISSING_PARTS,
} = GamesWithMissingPartsSlice.actions;
