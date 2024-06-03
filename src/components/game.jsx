import React from "react";
import { useSelector } from "react-redux";
export const Game = () => {
  const gamesFromStore = useSelector((state) => state.game.games);
  console.log(gamesFromStore.GameName);
  return (
    <div>
      {gamesFromStore?.map((currentGame) => (
        <div>{currentGame.GameName}</div>
      ))}
    </div>
  );
};
