import React from "react";
import "./homePage.css";
import { Login } from "../Login/login";
import { SideBar } from "../SideBar/sideBar";
import { useLocation } from "react-router-dom";

export const HomePage = () => {
  const location = useLocation();
  const myLocation = location.pathname;
  return (
    <div className="image">
      <div className="nav-bar"></div>
      <div className="logo"></div>
      {myLocation == "/" ? (
        <div className="login-comp">
          <Login />
        </div>
      ) : (
        <div className="side-bar-comp">
          <SideBar />
        </div>
      )}
    </div>
  );
};
