import React from "react";
import "./userScreen.css";
import MailIcon from "@mui/icons-material/Mail";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import PersonIcon from "@mui/icons-material/Person";

export const UserTitle = ({ name, phone, cellphone, email }) => {
  return (
    <div className="personalDetailsTitle">
      <div className="all-person-details-title">
        <div className="name-container">
          <PersonIcon className="icon person-icon" />
          <div className="name">{name}</div>
        </div>
        <div className="contact-info">
          <PhoneEnabledIcon className="icon phone-icon" />
          <div className="phone">
            {cellphone} {phone}
          </div>
        </div>
        <div className="email-info">
          <MailIcon className="icon mail-icon" />
          <div className="email">{email}</div>
        </div>
      </div>
    </div>
  );
};