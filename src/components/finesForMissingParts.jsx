import React from "react";
import { useSelector } from "react-redux";
export const FinesForMissingParts = () => {
  const finesForMissingPartsFromStore = useSelector(
    (state) => state.fineForMissingParts.finesForMissingParts
  );
  return (
    <div>
      {finesForMissingPartsFromStore?.map((currentFineForMissingPart) => (
        <div>{currentFineForMissingPart.FineCode}</div>
      ))}
    </div>
  );
};
