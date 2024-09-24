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
    UPDATE_TYPE_GAME: (state, action) => {
      const { _id, ...newValues } = action.payload;
      const updatedTypeGames = state.typesGames.map((type) => {
        if (type._id === _id) {
          return { ...type, ...newValues };
        }
        return type;
      });
      state.typesGames = updatedTypeGames;
    },
  },
});
export const {
  setTypeGame,
  setTypesGames,
  ADD_TYPE_GAME,
  DELETE_TYPE_GAME,
  UPDATE_TYPE_GAME,
} = TypeGameSlice.actions;
