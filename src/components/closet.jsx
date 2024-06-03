import React from "react";
import { useSelector } from "react-redux";
export const Closet = () => {
  const closetsFromStore = useSelector((state) => state.closet.closets);
  return (
    <div>
      {closetsFromStore?.map((currentCloset) => (
        <div>{currentCloset.closetType}</div>
      ))}
    </div>
  );
};
