import React from "react";
import { useSelector } from "react-redux";
export const TypeGame = () => {
  const typesGamesFromStore = useSelector((state) => state.typeGame.typesGames);
  return (
    <div>
      {typesGamesFromStore?.map((currentGame) => (
        <div>{currentGame.gameTipeName}</div>
      ))}
    </div>
  );
};
