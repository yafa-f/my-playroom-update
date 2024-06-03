import React from "react";
import { useSelector } from "react-redux";
export const TakeOrReturn = () => {
  const torFromStore = useSelector(
    (state) => state.takingOrReturning.takingsOrReturnings
  );
  return (
    <div>
      {torFromStore?.map((currentTor) => (
        <div>{currentTor.GameCode}</div>
      ))}
    </div>
  );
};
