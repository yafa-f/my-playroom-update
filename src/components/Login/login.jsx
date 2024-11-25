import React, { useState } from "react";
import "./login.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const Login = (props) => {
  const [code, setCode] = useState();

  return (
    <div className="login-card">
      <div className="welcome">ברוכים הבאים למערכת משחקולנו</div>
      <div className="name-code">נא להכניס שם משתמש וסיסמא</div>
      <div type="text"></div>
      <TextField
        defaultValue="שם משתמש"
        size="small"
        onChange={(e) => {
          props.setName(e.target.value);
        }}
        sx={{
          direction: "rtl",
          width: "22vw",
          height: "3vh",
          marginTop: "3vh",
          marginLeft: "5vw",
        }}
      />
      <br />
      <TextField
        defaultValue="סיסמא"
        size="small"
        onChange={(e) => {
          setCode(e.target.value);
        }}
        sx={{
          direction: "rtl",
          width: "22vw",
          height: "3vh",
          marginTop: "4vh",
          marginLeft: "5vw",
        }}
      />
      <br />
      <Link to="/UsersList">
        <Button
          variant="contained"
          sx={{ marginTop: "5vh", marginLeft: "5vw", width: "9vw" }}
        >
          אישור
        </Button>
      </Link>
    </div>
  );
};

