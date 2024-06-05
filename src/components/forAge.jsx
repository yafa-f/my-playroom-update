import React from "react";
import { useSelector } from "react-redux";
export const ForAge = () => {
  const forAgesFromStore = useSelector((state) => state.forAge.forAges);
  return (
    <div>
      {forAgesFromStore?.data?.map((currentForAge) => (
        <div>{currentForAge.stickerColor}</div>
      ))}
    </div>
  );
};