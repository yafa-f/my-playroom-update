import { Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

export const NewUser = () => {
  const [styleName, setStyleName] = useState(false);
  const [stylePhone, setStylePhone] = useState(false);
  const [styleCode, setStyleCode] = useState(false);
  const [textFieldNameValue, setTextFieldNameValue] = useState("");
  const [textFieldPhoneValue, setTextFieldPhoneValue] = useState("");
  const [textFieldAdditionalPhoneValue, setTextFieldAdditionalPhoneValue] =
    useState("");
  const [textCodeValue, setTextCodeValue] = useState("");

  const [circleFlag, setCircleFlag] = useState(false);
  const [clicked, setClicked] = useState("");
  const [phoneErrorText, setPhoneErrorText] = useState("");
  const [codeErrorText, setCodeErrorText] = useState("");
  const [users, setUsers] = useState(useSelector((state) => state.user.users));
  const selector = useSelector((state) => state.user.users);
  const [text, setText] = useState("להוספה");

  const handleNameChange = (event) => {
    setTextFieldNameValue(event.target.value);
    setStyleName(false);
  };
  const handlePhoneChange = (event) => {
    setTextFieldPhoneValue(event.target.value);
    setStylePhone(false);
  };
  const handleAdditionalPhoneChange = (event) => {
    setTextFieldAdditionalPhoneValue(event.target.value);
  };
  const handleCodeChange = (event) => {
    setTextCodeValue(event.target.value);
    setStyleCode(false);
  };
  const checkValue = async () => {
    let valid = true;
    setClicked(true);

    if (!textFieldNameValue) {
      setStyleName(true);
      valid = false;
    }

    if (!textFieldPhoneValue) {
      setPhoneErrorText("שדה חובה");
      setStylePhone(true);
      valid = false;
    } else if (!isIsraeliPhoneNumber(textFieldPhoneValue)) {
      setPhoneErrorText("מספר טלפון אינו חוקי");
      setStylePhone(true);
      valid = false;
    }
    if (!textCodeValue) {
      setCodeErrorText("הכנס קוד");
      setStyleCode(true);
      valid = false;
    }

    const allUsers = selector.data.map((obj) => {
      if (textCodeValue === obj.userCode) {
        setCodeErrorText("הקוד קיים אנא הכנס קוד אחר");
        setStyleCode(true);
        valid = false;
      }
    });
    if (valid) {
      setCircleFlag(true);
      const res = await addNewUser();
      setTimeout(() => {
        setCircleFlag(false);
      }, 1000);
    }
  };

  const isIsraeliPhoneNumber = (phone) => {
    const regex = /^05\d{8}$/;
    return regex.test(phone);
  };

  const addNewUser = async () => {
    const response = await fetch("http://localhost:5000/userRoutes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userCode: textCodeValue,
        userName: textFieldNameValue,
        cellphone: textFieldAdditionalPhoneValue,
        phone: textFieldPhoneValue,
      }),
    });
    if (response.ok) {
      console.log("User added successfully!");
      setTextFieldPhoneValue("");
      setTextFieldNameValue("");
      setTextFieldAdditionalPhoneValue("");
      setTextCodeValue("");
      setText("המשתמש נוסף בהצלחה");
      setTimeout(() => {
        setText("להוספה");
      }, 2000);
    } else {
      setText("ההוספה נכשלה");
      console.error("Failed to add user.");
    }
    const userData = await response.json();
    setUsers(...users.data, userData);
  };
  return (
    <div>
      <Box
        margin="auto"
        height={300}
        width={200}
        my={4}
        display="column"
        alignContent="center"
        gap={4}
        p={2}
        sx={{ border: "2px solid grey", display: "table" }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="שם משתמש"
          name="firstName"
          value={textFieldNameValue}
          onChange={handleNameChange}
          error={styleName && clicked}
          helperText={styleName && clicked ? "שדה חובה" : ""}
        ></TextField>
        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          label="טלפון"
          name="phone"
          value={textFieldPhoneValue}
          onChange={handlePhoneChange}
          error={stylePhone && clicked}
          helperText={stylePhone && clicked ? phoneErrorText : ""}
        ></TextField>
        <TextField
          margin="normal"
          id="additionalPhone"
          label="טלפון נוסף"
          name="additionalPhone"
          value={textFieldAdditionalPhoneValue}
          onChange={handleAdditionalPhoneChange}
        ></TextField>
        <TextField
          margin="normal"
          required
          fullWidth
          id="code"
          label="קוד משתמש"
          name="code"
          value={textCodeValue}
          onChange={handleCodeChange}
          error={styleCode && clicked}
          helperText={styleCode && clicked ? codeErrorText : ""}
        ></TextField>
        <Button
          onClick={checkValue}
          sx={{ width: "200px", marginTop: "7px" }}
          variant="contained"
          color="success"
        >
          {" "}
          {circleFlag && <CircularProgress sx={{ color: "white" }} />}
          {!circleFlag && <text>{text}</text>}
        </Button>
      </Box>
    </div>
  );
};
