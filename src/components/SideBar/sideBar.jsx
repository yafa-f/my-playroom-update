import React from "react";
import "./sideBar.css";
import games from "../../assets/משחקים.svg";
import games2 from "../../assets/משחקים2.svg";
import users from "../../assets/מנויים.svg";
import users2 from "../../assets/מנויים2.svg";
import take from "../../assets/השאלות.svg";
import take2 from "../../assets/השאלות2.svg";
import other from "../../assets/אחר.svg";
import other2 from "../../assets/אחר2.svg";
import { Link, useLocation } from "react-router-dom";
export const SideBar = () => {
  const location = useLocation();
  const myLocation = location.pathname;
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
    <div className={`side-bar ${myLocation == "/" ? "login" : ""}`}>
      {namesArr.map((name, i) => (
        <div
          className={`side-list ${
            myLocation == `/${name.to}` || myLocation.includes(name.to)
              ? "choosen"
              : ""
          }`}
          key={i}
        >
          <img
            className={"img-icon"}
            src={
              myLocation == `/${name.to}` || myLocation.includes(name.to)
                ? name.srcChoosen
                : name.src
            }
          />
          <Link
            className={`side-names ${
              myLocation == `/${name.to}` || myLocation.includes(name.to)
                ? "choosen"
                : ""
            }`}
            to={name.to}
          >
            {name.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

