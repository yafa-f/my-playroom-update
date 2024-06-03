import React from "react";
import { useSelector } from "react-redux";
export const Game = () => {
  const gamesFromStore = useSelector((state) => state.game.games);
  return (
    <div>
      {gamesFromStore?.map((currentGame) => (
        <div>{currentGame.GameName}</div>
      ))}
    </div>
  );
};
