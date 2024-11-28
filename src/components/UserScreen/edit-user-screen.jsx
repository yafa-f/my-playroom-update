import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import MailIcon from "@mui/icons-material/Mail";
import "./userScreen.css";
import Checkbox from "@mui/material/Checkbox";
import { useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";
import { UserTitle } from "./userTitle";
import { DepositAndDetailsEditAndAddComp } from "./deposit-and-details-edit-add";
export const EditUserScreen = () => {
  const location = useLocation();
  const user = location.state?.user;

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="screen" style={{ display: "grid" }}>
      <UserTitle
        name={user.userName}
        phone={user.phone}
        cellphone={user.cellphone}
      ></UserTitle>

      <button
        style={{
          height: "44px",
          width: "44px",
          borderColor: "#0678FC",
          backgroundColor: "white",
          borderRadius: "9999px",
          marginLeft: "110px",
          marginTop: "50px",
        }}
      >
        <EditIcon sx={{ color: "#0678FC" }}></EditIcon>
      </button>
      <DepositAndDetailsEditAndAddComp
        userCode={user.userCode}
        userName={user.userName}
        userDate={user.userDate}
        cellphone={user.cellphone}
        phone={user.phone}
        email={user.email}
        branchNumber={user.branchNumber}
        checkNumber={user.checkNumber}
        accountNumber={user.accountNumber}
        bankNumber={user.bankNumber}
        totalPayment={user.totalPayment}
        depositPaid={user.depositPaid}
        paymentType={user.paymentType}
      ></DepositAndDetailsEditAndAddComp>

      <div
        className="save"
        style={{
          width: "70px",
          height: "30px",
          borderRadius: "28px",
          backgroundColor: "#0678FC",
          marginLeft: "110px",
          marginTop: "20px",
          textAlign: "center",
          color: "white",
          fontWeight: 700,
          alignContent: "center",
        }}
      >
        אישור
      </div>
      <div className="userSideBar"></div>
    </div>
  );
};
