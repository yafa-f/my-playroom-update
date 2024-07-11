import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTypeGame: {},
  typesGames: [],
};

export const TypeGameSlice = createSlice({
  name: "typeGame",
  initialState: initialState,
  reducers: {
    setTypeGame: (state, action) => {
      state.currentTypeGame = action.payload;
    },
    setTypesGames: (state, action) => {
      state.typesGames = action.payload;
    },
    ADD_TYPE_GAME: (state, action) => {
      state.typesGames.push(action.payload);
    },
    DELETE_TYPE_GAME: (state, action) => {
      state.typesGames = state.typesGames.filter(
        (type) => type._id !== action.payload._id
      );
    },
  },
});
export const { setTypeGame, setTypesGames, ADD_TYPE_GAME, DELETE_TYPE_GAME } =
  TypeGameSlice.actions;
