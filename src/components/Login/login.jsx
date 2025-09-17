import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useCity } from "./LoginContext.jsx";

export const Login = () => {
  const [inputCode, setInputCode] = useState("");
  const { saveCityCode } = useCity();

  const handleLogin = () => {
    if (inputCode.trim()) {
      saveCityCode(inputCode.trim());
    }
  };

  return (
    <div className="login-card">
      <div className="welcome">ברוכים הבאים למשחקיה</div>
    
      <Link to="/UsersList" onClick={handleLogin}>
        <Button
          variant="contained"
          sx={{ marginTop: "7vh", marginLeft: "2vw", width: "9vw",height:"8vh" }}
          disabled={!inputCode.trim()}
        >
          כניסה
        </Button>
      </Link>
        <TextField
        label="קוד עיר"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        sx={{ marginTop: "7vh", marginLeft: "3vw", width: "9vw" }}
      />
    </div>
  );
};
