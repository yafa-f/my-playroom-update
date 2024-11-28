import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import MailIcon from "@mui/icons-material/Mail";
import "./userScreen.css";
import "../UsersList/usersList.css";
import Checkbox from "@mui/material/Checkbox";
import Supervisor from "../../assets/supervisor_account.svg";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserTitle } from "./userTitle";
import { DepositAndDetailsEditAndAddComp } from "./deposit-and-details-edit-add";
export const ViewUserScreen = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [isEdit, setIsEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    setIsEdit(location.pathname.endsWith("editUser"));
  }, [location.pathname]);
  return (
    <div className="screen" style={{ display: "grid" }}>
      {user ? (
        <UserTitle
          name={user.userName}
          phone={user.phone}
          cellphone={user.cellphone}
          email={user.email}
        ></UserTitle>
      ) : (
        <div className="usersCaptionWithIcon" style={{ marginLeft: "35vw" }}>
          <div className="add-user">הוספת מנוי</div>
          <img src={Supervisor.toString()}></img>
        </div>
      )}

      <div className="depdet" style={{ marginTop: "40px" }}>
        <DepositAndDetailsEditAndAddComp
          user={user}
          isEdit={isEdit}
        ></DepositAndDetailsEditAndAddComp>
      </div>

      <div className="userSideBar"></div>
    </div>
  );
};
