import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation } from "react-router-dom";
import { UserTitle } from "./userTitle";
import { DepositAndDetailsEditAndAddComp } from "./edit-add-user-details";
import "./userScreen.css";

export const EditUserScreen = () => {
  const location = useLocation();
  const user = location.state?.user;
  return (
    <div className="screen">
      <UserTitle
        name={user.userName}
        phone={user.phone}
        cellphone={user.cellphone}
      />
      <button className="edit-button">
        <EditIcon sx={{ color: "#0678FC" }} />
      </button>
      <DepositAndDetailsEditAndAddComp {...user} />
      <div className="save-button">אישור</div>
      <div className="userSideBar"></div>
    </div>
  );
};