import React from "react";
import { useSelector } from "react-redux";
export const Fine = () => {
  const finesFromStore = useSelector((state) => state.fine.fines);
  return (
    <div>
      {finesFromStore?.map((currentFine) => (
        <div>{currentFine.Type}</div>
      ))}
    </div>
  );
};
