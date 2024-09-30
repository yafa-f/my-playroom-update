import React from 'react'
import './homePage.css'
export const HomePage=()=> {
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

 
