import { Box, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from "react-router-dom";
import { setGames } from "../../app/slices/gameSlice";
import { ADD_GAME } from "../../app/slices/gameSlice";
import{ ADD_CLOSET } from "../../app/slices/closetSlice"
import { setClosets } from "../../app/slices/closetSlice";
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export const NewGame = () => {
  const [textHaveComplementaryGameValue, setTextHaveComplementaryGameValue] =
    useState(false);
  const [textPrintStickerValue, setTextPrintStickerValue] = useState(false);
  const [textAgeCodeValue, setTextAgeCodeValue] = useState("");
  const [textGameTypeCodeValue, setTextGameTypeCodeValue] = useState("");
  const [textGameNameValue, setTextGameNameValue] = useState("");
  const [textClosetNumberValue, setTextClosetNumberValue] = useState("");
  const [textGameCodeValue, setTextGameCodeValue] = useState("");
  const [textLocationInClosetValue, setTextLocationInClosetValue] =
    useState("");
  const [isLocationInClosetDisabled, setIsLocationInClosetDisabled] =
    useState(false);
  const [circleFlag, setCircleFlag] = useState(false);
  const [clicked, setClicked] = useState("");
  const [text, setText] = useState("להוספה");
  const [comps, setComps] = useState([]);
  const dispatch = useDispatch();
  const forAges = useSelector((state) => state.forAge.forAges);
  const typesGames = useSelector((state) => state.typeGame.typesGames);
  const [textTypeOfPartValue, setTextTypeOfPartValue] = useState("");
  const [textAmountOfPartValue, setTextAmountOfPartValue] = useState();
  debugger
  const [localClosets, setLocalClosets] = useState(
    useSelector((state) => state.closet.closets)
  );
  const [arrayOfParts, setArrayOfParts] = useState([]);
  const [updateLocation, setUpdateLocation] = useState([]);
  const navigate = useNavigate();
  const [gameCodeErrorText, setGameCodeErrorText] = useState("");
  const [closetCodeErrorText, setClosetCodeErrorText] = useState("");
  const [gameNameErrorText, setGameNameErrorText] = useState("");
  const [styleGameName, setStyleGameName] = useState(false);
  const [styleClosetCode, setStyleClosetCode] = useState(false);
  const [styleGameCode, setStyleGameCode] = useState(false);
  const [localGames, setLocalGames] = useState(
    useSelector((state) => state.game.games)
  );

  useEffect(() => {

  }, [localGames]);

  useEffect(() => {
    
  }, [localClosets]);
debugger
  useEffect(() => {
    const selectedClosetArray =
      Array.isArray(localClosets) &&
      localClosets?.filter(
        (closet) => closet?.closetCode === textClosetNumberValue
      )[0]?.emptyPlace;
    if (selectedClosetArray) {
      if (textLocationInClosetValue === Math.max(...selectedClosetArray)) {
        let newPlace = textLocationInClosetValue + 1;
        const updatedNumbers = [
          ...selectedClosetArray?.slice(0, selectedClosetArray?.lenth - 1),
          newPlace,
        ];
        setUpdateLocation(updatedNumbers);
      } else {
        const updatedNumbers = selectedClosetArray?.filter(
          (number) => number !== textLocationInClosetValue
        );
        setUpdateLocation(updatedNumbers);
      }
    }
  }, [textLocationInClosetValue]);

  const navToHomePage = () => {
    navigate("/");
  };
  const handleGameCodeChange = (event) => {
    setTextGameCodeValue(event.target.value);
    setStyleGameCode(false);
  };
  const handleClosetNumberChange = (event) => {

    setTextClosetNumberValue(event.target.value);

    const isClosetEmpty = localClosets.find(
      (closet) => closet.closetCode === event.target.value
    );
    alert(isClosetEmpty.emptyPlace.length);
    isClosetEmpty.emptyPlace.length > 0
      ? setIsLocationInClosetDisabled(true)
      : setIsLocationInClosetDisabled(false);
      setStyleClosetCode(false);

  };
  const handleGameNameChange = (event) => {
    setTextGameNameValue(event.target.value);
    setStyleGameName(false)
  };
  const handleAgeCodeChange = (event) => {
    setTextAgeCodeValue(event.target.value);
  };
  const handleGameTypeCodeChange = (event) => {
    setTextGameTypeCodeValue(event.target.value);
  };
  const handleHaveComplementaryGameChange = (event) => {
    setTextHaveComplementaryGameValue(event.target.checked);
  };
  
  const handlePrintStickerChange = (event) => {
    setTextPrintStickerValue(event.target.checked);
  };
  const handleLocationInClosetChange = (event) => {
    setTextLocationInClosetValue(event.target.value);
  };

  const checkValue = async () => {
  
    let valid = true;
    setClicked(true);
    const isGameCodeUnique = !localGames.some(
      (game) => game.GameCode === textGameCodeValue
    );
    if (!textGameCodeValue) {
      setGameCodeErrorText("שדה חובה");
      setStyleGameCode(true);
      valid = false;
    } else if (!isGameCodeUnique) {
      setGameCodeErrorText("קוד קיים בחרי קוד אחר");
      setStyleGameCode(true);
      valid = false;
    }

    if (!textClosetNumberValue) {
      setClosetCodeErrorText("שדה חובה");
      setStyleClosetCode(true);
      valid = false;
    }
    if (!textGameNameValue) {
      setGameNameErrorText("שדה חובה");
      setStyleGameName(true);
      valid = false;
    }
    if (valid) {
      setCircleFlag(true);
      const res = await addNewGame();
      setTimeout(() => {
        setCircleFlag(false);
      }, 1000);
    }
  };

  const addNewGame = async () => {
    const responseclosetsRoutes = await fetch(
      `http://localhost:5000/closetsRoutes/${textClosetNumberValue}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          emptyPlace: updateLocation,
        }),
      }
    );

    if (responseclosetsRoutes.ok) {
      setUpdateLocation([]);
      const closetData = await responseclosetsRoutes.json();
      const rearrangedClosetData = {
        closetCode: closetData.closetCode,
        IsKlinait: closetData.IsKlinait,
        emptyPlace: closetData.emptyPlace,
        closetLocation: closetData.closetLocation,
      };
      dispatch(ADD_CLOSET(rearrangedClosetData));

    
      setLocalClosets((prevClosets) => {
        const updatedClosets = prevClosets.map((closet) =>
          closet.closetCode === rearrangedClosetData.closetCode
            ? rearrangedClosetData
            : closet
        );
        return updatedClosets;
      });
    
      
    } 
   else{alert("no update the closet")}
    
    const response = await fetch("http://localhost:5000/gamesListRoutes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id:"?",
        GameCode: textGameCodeValue,
        ClosetNumber: textClosetNumberValue,
        GameName: textGameNameValue,
        GameTypeCode: textGameTypeCodeValue,
        Parts: arrayOfParts,
        AgeCode: textAgeCodeValue,
        CurrentStateOfGame: "?", 
        PrintSticker: textPrintStickerValue,
        HaveComplementaryGame: textHaveComplementaryGameValue,
        Location: textLocationInClosetValue,
        IsAvailable:true,
      })

    });
    console.log(response.body);
    if (response.ok) {
      setTextGameCodeValue("");
      setTextClosetNumberValue("");
      setTextGameNameValue("");
      setTextGameTypeCodeValue("");
      setArrayOfParts([]);
      setIsLocationInClosetDisabled(false)
      setTextAgeCodeValue("");
      setComps([]);
      setTextLocationInClosetValue("");
      setTextGameTypeCodeValue("");
      setTextAmountOfPartValue("");
    setTextTypeOfPartValue("");
      setText("המשחק נוסף בהצלחה");
      const gameData = await response.json();
      const rearrangedGameData = {
        id: gameData._id,
        Id: gameData.Id,
        GameCode:gameData.GameCode,
        ClosetNumber: gameData.ClosetNumber,
        GameName: gameData.GameName,
        GameTypeCode: gameData.GameTypeCode,
        Parts: gameData.Parts,
        AgeCode: gameData.AgeCode,
        CurrentStateOfGame: gameData.CurrentStateOfGame, 
        PrintSticker: gameData.PrintSticker==true?"כן":"לא",
        HaveComplementaryGame: gameData.HaveComplementaryGame==true?"כן":"לא",
        Location: gameData.Location,
        IsAvailable: gameData.IsAvailable==true?"כן":"לא",
      };
      dispatch(ADD_GAME(rearrangedGameData));
      setLocalGames((prevGames) => {
        return { data: [...prevGames, rearrangedGameData] };
      });

      setTimeout(() => {
        setText("להוספה");
      }, 2000);
    } else {
      setText("ההוספה נכשלה");
    }
  };
  const addParts = () => {
    const newComp = (
      <AddParts
        key={comps.length}
        textTypeOfPartValue={textTypeOfPartValue}
        textAmountOfPartValue={textAmountOfPartValue}
        setTextTypeOfPartValue={setTextTypeOfPartValue}
        setTextAmountOfPartValue={setTextAmountOfPartValue}
        arrayOfParts={arrayOfParts}
        setArrayOfParts={setArrayOfParts}
      />
    );
    setComps((prevComps) => [...prevComps, newComp]);
    setTextAmountOfPartValue("");
    setTextTypeOfPartValue("");
  };
  const addFinalParts = () => {
  
    const part = {
      name: textTypeOfPartValue,
      amount: textAmountOfPartValue,
    };
  };
  return (
    <div>
      <Box
        margin="auto"
        height={600}
        width={400}
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
          id="gameCode"
          label="קוד משחק"
          name="gameCode"
          value={textGameCodeValue}
          onChange={handleGameCodeChange}
          error={styleGameCode && clicked}
          helperText={styleGameCode && clicked ? gameCodeErrorText : ""}
        />

     <FormControl fullWidth error={styleClosetCode && clicked}>
        <InputLabel id="demo-simple-select-error-label">קוד ארון</InputLabel>
        <Select
          labelId="demo-simple-select-error-label"
          required
          id="demo-simple-select-error"
          value={textClosetNumberValue}
          label="ClosetNumberValue"
          onChange={handleClosetNumberChange}
        >
          {Array.isArray(localClosets) &&
              localClosets?.map((closet) => (
                <MenuItem value={closet.closetCode}>
                  {closet.closetCode}
                </MenuItem>
              ))}
        </Select>
        {styleClosetCode&&<FormHelperText>{closetCodeErrorText}</FormHelperText>}
    
      </FormControl>
        {isLocationInClosetDisabled && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">מיקום בארון</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              required
              value={textLocationInClosetValue}
              label="LocationInCloset"
              onChange={handleLocationInClosetChange}
            >
              {Array.isArray(localClosets) &&
                localClosets?.map((closet) =>
                  closet?.closetCode === textClosetNumberValue ? (
                    closet?.emptyPlace?.map((place) => (
                      <MenuItem value={place}>{place}</MenuItem>
                    ))
                  ) : (
                    <div></div>
                  )
                )}
            </Select>
          </FormControl>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="GameName"
          label="שם משחק"
          name="GameName"
          value={textGameNameValue}
          onChange={handleGameNameChange}
          error={styleGameName && clicked}
          helperText={styleGameName && clicked ? gameNameErrorText : ""}
        ></TextField>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">סוג המשחק</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={textGameTypeCodeValue}
            label="GameType"
            onChange={handleGameTypeCodeChange}
          >
            {typesGames?.map((type) => (
              <MenuItem value={type.gameTipeName}>{type.gameTipeName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          חלקי המשחק
          <AddParts
            key={comps.length}
            textTypeOfPartValue={textTypeOfPartValue}
            textAmountOfPartValue={textAmountOfPartValue}
            setTextTypeOfPartValue={setTextTypeOfPartValue}
            setTextAmountOfPartValue={setTextAmountOfPartValue}
            arrayOfParts={arrayOfParts}
            setArrayOfParts={setArrayOfParts}
          />
          {comps.map((c) => c)}
          <AddIcon onClick={addParts} />
          <button onClick={addFinalParts} >שמירה חלקי המשחק</button>
        </div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            המשחק מיועד לגילאי
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={textAgeCodeValue}
            label="Age"
            onChange={handleAgeCodeChange}
          >
            {forAges?.data?.map((age) => (
              <MenuItem value={age.Age}>{age.Age}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction="row" spacing={1} alignItems="center">
          " ?להדפיס מדבקה"
          <Typography>לא</Typography>
          <AntSwitch
            defaultChecked
            inputProps={{ "aria-label": "ant design" }}
            checked={textPrintStickerValue}
            onChange={handlePrintStickerChange}
          />
          <Typography>כן</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          "?האם יש משחק משלים"
          <Typography>לא</Typography>
          <AntSwitch
            defaultChecked
            inputProps={{ "aria-label": "ant design" }}
            checked={textHaveComplementaryGameValue}
            onChange={handleHaveComplementaryGameChange}
          />
          <Typography>כן</Typography>
        </Stack>
        <Button
          sx={{ width: "200px", marginTop: "7px" }}
          variant="contained"
          color="success"
          onClick={checkValue}
        >
          {circleFlag && <CircularProgress sx={{ color: "white" }} />}
          {!circleFlag && <text>{text}</text>}
        </Button>
      </Box>
    </div>
  );
};
export const AddParts = (props) => {
  const addToArray = () => {
    const part = {
      name: props.textTypeOfPartValue,
      amount: props.textAmountOfPartValue,
    };
    const partsString = JSON.stringify(part);
    props.setArrayOfParts((prevArray) => [...prevArray, partsString]);
  };
  return (
    <div style={{ display: "inline-block", marginBottom: "50px" }}>
      <TextField
        id="standard"
        label="סוג "
        value={props.textTypeOfPartValue}
        onChange={(e) => props.setTextTypeOfPartValue(e.target.value)}
        variant="standard"
      />
      <TextField
        id="standard"
        label="כמות"
        type="number"
        value={props.textAmountOfPartValue}
        onChange={(e) => props.setTextAmountOfPartValue(e.target.value)}
        onBlur={addToArray}
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        style={{ marginLeft: "10px" }}
      />
    </div>
  );
};
