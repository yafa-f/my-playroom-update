import React from "react";
import "./homePage.css";
import { Login } from "../Login/login";
import { SideBar } from "../SideBar/sideBar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
export const HomePage = () => {
  const location = useLocation();

  const [name, setName] = useState("");
  const myLocation = location.pathname;
  return (
    <div className="image">
      <div className="nav-bar">
        <div className="display-login-name">
          {name===""||name==="שם משתמש"? <div></div> :  <div className="user-icon"></div>}
      
          <div className="login-user-name">{name}</div>
        </div>
      </div>
      <div className="logo"></div>
      {myLocation == "/" ? (
        <div className="login-comp">
          <Login setName={setName} />
        </div>
      ) : (
        <div className="side-bar-comp">
          <SideBar />
        </div>
      )}
    </div>
  );
};

