import React, { useState } from "react";
import "./login.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
export const Login = (props) => {
  const [nameToLogin, setNameToLogin] = useState();
  const [codeToLogin, setCodeToLogin] = useState();
  const name = (e) => {
    setNameToLogin(e.target.value);
  };
  const code = (e) => {
    setCodeToLogin(e.target.value);
  };
  const setProps = () => {
    props.setName(nameToLogin);
  };
  return (
    <div className="login-card">
      <div className="welcome">ברוכים הבאים למערכת משחקולנו</div>
      <div className="name-code">נא להכניס שם משתמש וסיסמא</div>
      <div type="text"></div>
      <TextField
        defaultValue="שם משתמש"
        size="small"
        onChange={name}
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
        onChange={code}
        sx={{
          direction: "rtl",
          width: "22vw",
          height: "3vh",
          marginTop: "4vh",
          marginLeft: "5vw",
        }}
      />
      <br />
      <Link to="/Homepage">
        <Button
          onClick={setProps}
          variant="contained"
          sx={{ marginTop: "5vh", marginLeft: "5vw", width: "9vw" }}
        >
          אישור
        </Button>
      </Link>
    </div>
  );
};
