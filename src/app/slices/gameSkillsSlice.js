import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentGameSkill: {},
  gameSkills: [],
};

export const GameSkillsSlice = createSlice({
  name: "gameSkills",
  initialState: initialState,
  reducers: {
    setGameSkill: (state, action) => {
      state.currentGameSkill = action.payload;
    },
    setGameSkills: (state, action) => {
      state.gameSkills = action.payload;
    },
    ADD_GAME_SKILL: (state, action) => {
      state.gameSkills.push(action.payload);
    },
    DELETE_GAME_SKILL: (state, action) => {
      state.gameSkills = state.gameSkills.filter(
        (skill) => skill._id !== action.payload._id
      );
    },
    UPDATE_GAME_SKILL: (state, action) => {
      const { _id, ...newValues } = action.payload;
      const updatedSkills = state.gameSkills.map((skill) => {
        if (skill._id === _id) {
          return { ...skill, ...newValues };
        }
        return skill;
      });
      state.gameSkills = updatedSkills;
    },
  },
});

export const {
  setGameSkill,
  setGameSkills,
  ADD_GAME_SKILL,
  DELETE_GAME_SKILL,
  UPDATE_GAME_SKILL,
} = GameSkillsSlice.actions;
