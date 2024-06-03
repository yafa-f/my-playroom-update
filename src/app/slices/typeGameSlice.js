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
  },
});
export const { setTypeGame, setTypesGames } = TypeGameSlice.actions;
