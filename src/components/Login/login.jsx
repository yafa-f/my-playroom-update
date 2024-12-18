import React, { useState } from "react";
import "./login.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Login = (props) => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loginName, setLoginName] = useState("");
  const [loginCode, setLoginCode] = useState("");

  const handleLogin = () => {
    if (!loginName || !loginCode) {
      setError("עליך למלא את השדות הנדרשים");
    } else {
      setError("");
      navigate("/UsersList");
      props.setName(loginName);
      props.setCode(loginCode);
    }
  };
  return (
    <div className="login-card">
      <div className="welcome">ברוכים הבאים למערכת משחקולנו</div>
      <div className="name-code">נא להכניס שם משתמש וסיסמא</div>
      <div type="text"></div>
      <TextField
        placeholder="שם משתמש"
        size="small"
        onChange={(e) => {
          setLoginName(e.target.value);
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
        placeholder="סיסמא"
        size="small"
        onChange={(e) => {
          setLoginCode(e.target.value);
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
      {error && (
        <div
          style={{
            color: "red",
            direction: "rtl",
            marginTop: "20px",
            marginRight: "20px",
            size: "8px",
          }}
        >
          {error}
        </div>
      )}
      <Button
        onClick={handleLogin}
        variant="contained"
        sx={{ marginTop: "5vh", marginLeft: "5vw", width: "9vw" }}
      >
        אישור
      </Button>
    </div>
  );
};
