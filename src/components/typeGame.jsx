import React from "react";
import { useSelector } from "react-redux";
export const TypeGame = () => {
    debugger
  const typesGamesFromStore = useSelector((state) => state.typeGame.typesGames);
  console.log(typesGamesFromStore.gameTipeName);
  return (
    <div>
      {typesGamesFromStore?.map((currentGame) => (
        <div>{currentGame.gameTipeName}</div>
      ))}
    </div>
  );
};
