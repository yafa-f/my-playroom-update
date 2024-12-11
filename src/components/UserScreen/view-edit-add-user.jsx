import "./userScreen.css";
import "../Lists/UsersList/usersList.css";
import Supervisor from "../../assets/supervisor_account.svg";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserTitle } from "./userTitle";
import { EditAddUserDetails } from "./edit-add-user-details";
export const ViewEditAddUser = () => {
  const location = useLocation();
  const user = location.state?.user;
  const singleUser = useSelector((state) => state.singleUser.singleUser);

  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="screen" style={{ display: "grid" }}>
   
         {singleUser&&!location.pathname.endsWith('newUser') ? (
        <UserTitle
          name={singleUser.userName}
          phone={singleUser.phone}
          cellphone={singleUser.cellphone}
          email={singleUser.email}
        ></UserTitle>
      ) : (
        <div className="usersCaptionWithIcon" style={{ marginLeft: "35vw" }}>
          <div className="add-user">הוספת מנוי</div>
          <img src={Supervisor.toString()}></img>
        </div>
      )}

      <div className="depdet" style={{ marginTop: "40px" }}>
        <EditAddUserDetails user={user}></EditAddUserDetails>
      </div>

      <div className="userSideBar"></div>
    </div>
  );
};
