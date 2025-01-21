import React from "react";
import "./sideBar.css";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const SideBar = (props) => {
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  const navList = props.navList;
  const location = useLocation();
  const myLocation = location.pathname;

  return (
    <div className={`side-bar ${myLocation === "/" ? "login" : ""}`}>
      {navList?.map((name, i) => {
        const isBoolPath =
          myLocation.includes("bool") ||
          myLocation.startsWith("/singleUser/editUser");
        const isSelected =
          isAdmin ||
          name.to === "GamesList" ||
          name.to === "UsersList" ||
          myLocation.includes("singleUser");

        if (isSelected) {
          const isActive =
            (isBoolPath && myLocation.includes(`/${name.to}`)) ||
            myLocation.endsWith(`/${name.to}`);

          return (
            <div className={`side-list ${isActive ? "choosen" : ""}`} key={i}>
              <img
                className={"img-icon"}
                src={isActive ? name.srcChoosen : name.src}
                alt={name.name}
              />
              <Link
                className={`side-names ${isActive ? "choosen" : ""}`}
                to={name.to}
              >
                {name.name}
              </Link>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
