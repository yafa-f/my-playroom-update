import "./userScreen.css";
import "../Lists/UsersList/usersList.css";
import Supervisor from "../../assets/supervisor_account.svg";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserTitle } from "./userTitle";
import { EditAddUserDetails } from "./edit-add-user-details";

export const ViewEditAddUser = () => {
  const location = useLocation();
  const user = location.state?.user;
  const singleUser = useSelector((state) => state.singleUser.singleUser);
  const renderUserTitle = () => {
    if (singleUser && !location.pathname.endsWith("newUser")) {
      const { userName, phone, cellphone, email } = singleUser;
      return (
        <UserTitle
          name={userName}
          phone={phone}
          cellphone={cellphone}
          email={email}
        />
      );
    } else {
      return (
        <div className="usersCaptionWithIcon" style={{ marginLeft: "35vw" }}>
          <div className="add-user">הוספת מנוי</div>
          <img src={Supervisor} alt="Supervisor Icon" />
        </div>
      );
    }
  };

  return (
    <div className="screen" style={{ display: "grid" }}>
      {renderUserTitle()}
      
      <div
        className="depdet"
        style={{ marginLeft: "-52px", marginTop: "40px" }}
      >
        <EditAddUserDetails user={user} />
      </div>
      <div className="userSideBar"></div>
    </div>
  );
};
