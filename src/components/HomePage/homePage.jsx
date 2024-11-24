import React from "react";
import "./homePage.css";
import { Login } from "../Login/login";
import { SideBar } from "../SideBar/sideBar";
import { useLocation } from "react-router-dom";
import games from "../../assets/משחקים.svg";
import games2 from "../../assets/משחקים2.svg";
import users from "../../assets/מנויים.svg";
import users2 from "../../assets/מנויים2.svg";
import take from "../../assets/השאלות.svg";
import take2 from "../../assets/השאלות2.svg";
import other from "../../assets/אחר.svg";
import other2 from "../../assets/אחר2.svg";
import person from "../../assets/person.svg";
import person2 from "../../assets/person2.svg";
import history1 from "../../assets/history1.svg";
import history2 from "../../assets/history2.svg";
import { useState } from "react";
export const HomePage = () => {
  const location = useLocation();

  const [name, setName] = useState("");
  const myLocation = location.pathname;


  const navigateFromUsersArr = [
    { name: "פרטים אישיים", src: person, srcChoosen: person2, to: "singleUser"},
    { name: "השאלות והחזרות", src: take, srcChoosen: take2, to:"singleUser/Taking_Returning" },
    { name: "היסטורית השאלות", src: history1, srcChoosen: history2, to: "singleUser/TakingHistory" },
  ];
  const namesArr = [
    { name: "מנויים", src: users, srcChoosen: users2, to: "UsersList" },
    { name: "משחקים", src: games, srcChoosen: games2, to: "GamesList" },
    { name: "השאלות ", src: take, srcChoosen: take2, to: "TakeList" },
    { name: "ארונות", src: other, srcChoosen: other2, to: "ClosetsList" },
    { name: "תחומי משחק", src: other, srcChoosen: other2, to: "GameTopicList" },
    {
      name: "קנסות לחלקים חסרים",
      src: other,
      srcChoosen: other2,
      to: "FinesList",
    },
    { name: "טווח גילאים", src: other, srcChoosen: other2, to: "AgesList" },
  ];
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
       !myLocation.includes("singleUser") ? (
        <div className="side-bar-comp">
          <SideBar navList={namesArr}/>
        </div>
        ):(
          <div className="side-bar-comp">
          <SideBar navList={navigateFromUsersArr}/>
        </div>
        )
      )}
    </div>
  );
};
