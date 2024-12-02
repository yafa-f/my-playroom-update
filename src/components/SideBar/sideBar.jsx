import React from "react";
import "./sideBar.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
export const SideBar = (props) => {
  const navigate = useNavigate();

  const navList = props.navList;
  const location = useLocation();
  const myLocation = location.pathname;
  return (
    <div className={`side-bar ${myLocation == "/" ? "login" : ""}`}>
      {navList?.map((name, i) => (
        <div
          className={`side-list ${
            myLocation == `/${name.to}` ? "choosen" : ""
          }`}
          key={i}
        >
          <img
            className={"img-icon"}
            src={myLocation == `/${name.to}` ? name.srcChoosen : name.src}
          />
          <Link
            className={`side-names ${
              myLocation == `/${name.to}` ? "choosen" : ""
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
