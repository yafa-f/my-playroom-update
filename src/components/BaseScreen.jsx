import React from "react";
import { Routing } from "../utils/routing";
import { HomePage } from "./HomePage/homePage";

export const BaseScreen = () => {
  return (
    <div>
      <HomePage />
      <div
        style={{
          position: "absolute",
          top: "20vh",
          width: "70vw",
          height: "30vh",
        }}
      >
        <Routing />
      </div>
    </div>
  );
};
