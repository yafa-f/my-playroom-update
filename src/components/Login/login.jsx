import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const Login = () => {
  return (
    <div className="login-card">
      <div className="welcome">ברוכים הבאים למשחקיה </div>
      <Link to="/UsersList">
        <Button
          variant="contained"
          sx={{ marginTop: "7vh", marginLeft: "5vw", width: "9vw" }}
        >
          כניסה
        </Button>
      </Link>
    </div>
  );
};
