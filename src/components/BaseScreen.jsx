import React from "react";
import { Routing } from "../utils/routing";
import { HomePage } from "./HomePage/HomePage";

export const BaseScreen = () => {
  return (
    <div>
      <HomePage />
      <div
        style={{
          position: "absolute",
          top: "15vh",
          width: "70vw",
          height: "30vh",
        }}
      >
        <Routing />
      </div>
    </div>
  );
};
