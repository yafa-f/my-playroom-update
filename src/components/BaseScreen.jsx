import React from "react";
import { Routing } from "../utils/routing";
import { HomePage } from "./HomePage/homePage";
import { useLocation } from "react-router-dom";

export const BaseScreen = () => {
  const location = useLocation();
  const myLocation = location.pathname;

  return (
    <>
      {myLocation !== "/addTake" && (
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
      )}
      {myLocation === "/addTake" && <Routing />}
    </>
  );
};
