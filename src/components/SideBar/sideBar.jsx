import React from "react";
import "./sideBar.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
export const SideBar = (props) => {
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  const navList = props.navList;
  const location = useLocation();
  const myLocation = location.pathname;
  return (
    <div className={`side-bar ${myLocation === "/" ? "login" : ""}`}>
      {navList?.map((name, i) => {
        // Check if isAdmin is true or if name.to matches the specified values
        if (isAdmin || name.to === "GamesList" || name.to === "UsersList") {
          return (
            <div
              className={`side-list ${
                myLocation.endsWith(`/${name.to}`) ? "choosen" : ""
              }`}
              key={i}
            >
              <img
                className={"img-icon"}
                src={
                  myLocation.endsWith(`/${name.to}`) ? name.srcChoosen : name.src
                }
              />
              <Link
                className={`side-names ${
                  myLocation.endsWith(`/${name.to}`) ? "choosen" : ""
                }`}
                to={name.to}
              >
                {name.name}
              </Link>
            </div>
          );
        }
        return null; // Return null for items that should not be rendered
      })}
    </div>
  );
};
