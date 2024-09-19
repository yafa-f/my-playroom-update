import { Box, TextField, Button, chec } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { ADD_USER } from "../../../app/slices/usersSlice";
import { useNavigate } from "react-router-dom";
import { isIsraeliPhoneNumber } from "../../CheckValues/checkPhone";
import { checkIsCode } from "../../CheckValues/checkCode";
import { ADD_CLOSET } from "../../../app/slices/closetSlice";
import Checkbox from "@mui/material/Checkbox";

export const NewCloset = () => {
  const [styleCode, setStyleCode] = useState(false);
  const [styleTypesGames, setStyleTypesGames] = useState(false);
  const [textFieldLocationValue, setTextFieldLocationValue] = useState("");
  const [textFieldTypesGamesValue, setTextFieldTypesGamesValue] = useState("");
  const [textCodeValue, setTextCodeValue] = useState("");
  const [circleFlag, setCircleFlag] = useState(false);
  const [clicked, setClicked] = useState("");
  const [codeErrorText, setCodeErrorText] = useState("");
  const [TypeGameErrorText, setTypeGameErrorText] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  //   const [IsKlinaitValue, setIsKlinaitValue] = useState(false);

  const [localClosets, setLocalClosets] = useState(
    useSelector((state) => state.closet.closets)
  );
  const [localCloset, setLocalCloset] = useState("");
  const [text, setText] = useState("להוספה");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {}, [localClosets]);

  const handleLocationChange = (event) => {
    setTextFieldLocationValue(event.target.value);
  };
  const handleTypesGamesChange = (event) => {
    setTextFieldTypesGamesValue(event.target.value);
    setStyleTypesGames(false);
  };
  const handleCodeChange = (event) => {
    setTextCodeValue(event.target.value);
    setStyleCode(false);
  };
  const handleIsKlinaitChange = (event) => {
    setIsChecked(!isChecked);
    // setIsKlinaitValue(event.target.value);
  };
  const navToHomePage = () => {
    navigate("/");
  };
  const checkValue = async () => {
    let valid = true;
    setClicked(true);

    if (!textFieldTypesGamesValue) {
      setTypeGameErrorText("שדה חובה");
      setStyleTypesGames(true);
      valid = false;
    }
    if (!checkIsCode(textCodeValue)) {
      setCodeErrorText("הכנס קוד");
      setStyleCode(true);
      valid = false;
    }
    const allClosets = localClosets.map((obj) => {
      if (textCodeValue === obj.closetCode) {
        setCodeErrorText("הקוד קיים אנא הכנס קוד אחר");
        setStyleCode(true);
        valid = false;
      }
    });
    if (valid) {
      setCircleFlag(true);
      const res = await addNewCloset();
      setTimeout(() => {
        setCircleFlag(false);
      }, 1000);
    }
  };

  const addNewCloset = async () => {
    debugger;
    const response = await fetch("http://localhost:5000/closetsRoutes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        closetCode: textCodeValue,
        closetType: textFieldTypesGamesValue,
        IsKlinait: isChecked,
        emptyPlace: [1],
        closetLocation: textFieldLocationValue,
      }),
    });
    if (response.ok) {
      setTextFieldLocationValue("");
      setTextFieldTypesGamesValue("");
      setTextCodeValue("");
      setIsChecked(false);
      setText("המשתמש נוסף בהצלחה");

      const closetData = await response.json();
      const rearrangedClosetData = {
        id: closetData._id,
        closetCode: closetData.closetCode,
        closetType: closetData.closetType,
        IsKlinait: closetData.IsKlinait,
        emptyPlace: closetData.emptyPlace,
        closetLocation: closetData.closetLocation,
      };
      dispatch(ADD_CLOSET(rearrangedClosetData));
      setLocalCloset(rearrangedClosetData);
      setLocalClosets((prevClosets) => {
        return { data: [...prevClosets, rearrangedClosetData] };
      });

      setTimeout(() => {
        setText("להוספה");
      }, 2000);
    } else {
      setText("ההוספה נכשלה");
    }
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
        <Button
          onClick={navToHomePage}
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

        <TextField
          margin="normal"
          required
          fullWidth
          id="location"
          label="מיקום הארון"
          name="location"
          value={textFieldLocationValue}
          onChange={handleLocationChange}
        ></TextField>
        <TextField
          margin="normal"
          id="typesGames"
          label="סוגי המשחקים בארון זה"
          name="typesGames"
          value={textFieldTypesGamesValue}
          error={styleTypesGames && clicked}
          helperText={styleTypesGames && clicked ? TypeGameErrorText : ""}
          onChange={handleTypesGamesChange}
        ></TextField>
        <div
          margin="normal"
          id="isKlinait"
          label="קלינאית?"
          name="isKlinait"
          checked={isChecked}
          onChange={handleIsKlinaitChange}
        >
          קלינאית?
          <Checkbox checked={isChecked} />
        </div>
        <TextField
          margin="normal"
          required
          fullWidth
          id="code"
          label="קוד ארון"
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
