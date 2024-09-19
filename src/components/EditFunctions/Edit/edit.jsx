import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { editGame } from "../EditGame/editGame";
import { editUser } from "../EditUser/editUser";
import { editForAge } from "../EditForAge/editForAge";
import { editCloset } from "../EditCloset/editCloset";
import { UPDATE_USER } from "../../../app/slices//usersSlice";
import { UPDATE_GAME } from "../../../app/slices/gameSlice";
import { UPDATE_FOR_AGE } from "../../../app/slices/forAgeSlice";
import { UPDATE_TYPE_GAME } from "../../../app/slices/typeGameSlice";
import { UPDATE_CLOSET } from "../../../app/slices/closetSlice";
import { editTypeGame } from "../EditTypeGame/editTypeGame";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
export const Edit = (props) => {
  const [updatedValues, setUpdatedValues] = useState({ ...props.row });
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const handleInputChange = (e, key) => {
    setUpdatedValues({ ...updatedValues, [key]: e.target.value });
  };
  const handleSave = async () => {
    const updatedObject = { ...updatedValues };
    const response = await onSave(updatedObject);
  };
  const onSave = async (updatedObject) => {
    switch (props.currentList) {
      case "רשימת משחקים":
        const updatedGame = await editGame(updatedObject);
        dispatch(UPDATE_GAME(updatedObject));
        props.editState();
        break;
      case "רשימת משתמשים":
        const updatedUser = await editUser(updatedObject);
        dispatch(UPDATE_USER(updatedObject));
        props.editState();
        break;
      case "רשימת טווח גילאים":
        const updatedForAge = await editForAge(updatedObject);
        dispatch(UPDATE_FOR_AGE(updatedObject));
        props.editState();
        break;
      case "רשימת תחומי משחק":
        const updatedTypeGame = await editTypeGame(updatedObject);
        dispatch(UPDATE_TYPE_GAME(updatedObject));
        props.editState();
        break;
      case "רשימת ארונות במשחקיה":
        const updatedCloset = await editCloset(updatedObject);
        dispatch(UPDATE_CLOSET(updatedObject));
        props.editState();
        break;
      default:
        console.error(`no update function found for ${props.currentList} `);
    }
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      props.hideComponent();
    }, 2000);
  };

  return (
    <div>
      {success && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          sx={{ width: "170px", alignContent: "center", margin: "auto" }}
          severity="success"
        >
          !הנתונים נשמרו בהצלחה
        </Alert>
      )}
      <Box
        margin="auto"
        height={200}
        width={200}
        my={4}
        display="column"
        alignContent="center"
        gap={4}
        p={2}
        sx={{ border: "2px solid grey", display: "table" }}
      >
        <Button
          onClick={() => {
            props.hideComponent();
          }}
          sx={{
            fontFamily: "sans-serif",
            fontSize: "22px",
            color: "red",
            marginLeft: "-18px",
            marginTop: "-11px",
            borderRadius: "0px",
            marginBottom: "-10px",
          }}
        >
          x
        </Button>

        {Object.keys(props.row).map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type="text"
              value={updatedValues[key]}
              onChange={(e) => handleInputChange(e, key)}
            />
          </div>
        ))}
        <button onClick={handleSave}>שמירה</button>
      </Box>
    </div>
  );
};
