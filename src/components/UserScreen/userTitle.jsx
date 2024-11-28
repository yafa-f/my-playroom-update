import React from "react";
import "./userScreen.css";
import MailIcon from "@mui/icons-material/Mail";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import PersonIcon from "@mui/icons-material/Person";

export const UserTitle = ({ name, phone, cellphone,email }) => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFFB2",
        width: "850px",
        height: "104px",
        borderRadius: "28px",
        marginLeft: "50px",
        marginTop: "-41px",
        display: "inline-flex",
        direction: "rtl",
      }}
      className="personalDetailsTitle"
    >
      <div
        className="all-person-details-title"
        style={{
          display: "inline-flex",
          marginTop: "30px",
          marginRight: "81px",
        }}
      >
        <div style={{ display: "inline-flex" }}>
          <PersonIcon
            sx={{
              color: "#0678FC",
              width: "45px",
              height: "45px",
              marginRight: "-50px",
            }}
          ></PersonIcon>
          <div
            className="isPaid"
            style={{
              fontSize: "27px",
              marginRight: "20px",
              fontWeight: "600",
            }}
          >
            {name}{" "}
          </div>
        </div>
        <div
          style={{
            display: "inline-flex",
            borderRight: "1px solid #0678FC",
            marginRight: "60px",
            height: "53px",
          }}
        >
          <PhoneEnabledIcon
            sx={{
              color: "#0678FC",
              width: "35px",
              height: "35px",
              marginRight: "20px",
            }}
          ></PhoneEnabledIcon>
          <div
            className="cost"
            style={{
              fontSize: "18px",
              marginTop: "5px",
              marginRight: "20px",
              marginLeft: "-30px",
              height: "53px",
            }}
          >
            {cellphone}{" "}
            {phone}
          </div>
        </div>
        <div
          style={{
            display: "inline-flex",
            borderRight: "1px solid #0678FC",
            height: "53px",
            marginRight: "50px",
          }}
        >
          <MailIcon
            sx={{
              color: "#0678FC",
              width: "35px",
              height: "35px",
              marginRight: "30px",
            }}
          ></MailIcon>{" "}
          <div
            className="wayPaid"
            style={{
              marginRight: "20px",
              marginTop: "5px",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            {email}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
