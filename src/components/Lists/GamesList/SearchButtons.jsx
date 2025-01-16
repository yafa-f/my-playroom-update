import React from "react";
import { useState, useEffect } from "react";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import "./gamesList.css";

export const SearchButtons = (props) => {
  const [selectArray, setSelectArray] = useState();
  const [chosenUsers, setChosenUsers] = useState([]);
  const typesGames = useSelector((state) => state.typeGame.typesGames);
  const forAges = useSelector((state) => state.forAge.forAges).data;
  const closets = useSelector((state) => state.closet.closets);
  const take = useSelector(
    (state) => state.takingOrReturning.takingsOrReturnings
  );
  const users = useSelector((state) => state.user.users).data;
  const games = useSelector((state) => state.game.games);

  useEffect(() => {
    switch (props.name) {
      case "שם מנוי":
        {
          const filterTake = take.filter(
            (item) => item.ActualReturnDate === undefined
          );
          const userCodes = filterTake.map((item) => item.UserCode);
          const matchingUsers = users
            ?.filter((user) => userCodes.includes(user.userCode))
            .map((user) => user.userName);
          setSelectArray(matchingUsers);
        }
        break;
      case "שם המשחק":
        {
          const filterTake = take.filter(
            (item) => item.ActualReturnDate === undefined
          );
          const gameCodes = filterTake.map((item) => item.GameCode);
          const matchingGames = games
            .filter((game) => gameCodes.includes(game.Id))
            .map((game) => game.GameName);
          setSelectArray(matchingGames);
        }
        break;
      case "תחום":
        {
          const type = typesGames.map((item) => item.gameTipeName);
          setSelectArray(type);
        }
        break;
      case "טווח גילאים":
        {
          const age = forAges?.map((item) => item.Age);
          setSelectArray(age);
        }
        break;
      case "סטטוס משחק":
        setSelectArray(["תקין", "חסרים חלקים"]);
        break;
      case "מס’ ארון":
        {
          const closetCodes = closets.map((item) => item.closetCode);
          setSelectArray(closetCodes);
        }
        break;
      case "סטטוס השאלה":
        setSelectArray(["מושאל", "במשחקייה"]);
        break;
      default:
        setSelectArray([]);
    }
  }, [props.name, typesGames, forAges, closets, take, users, games]);
  const handleChange = (event, value) => {
    setChosenUsers(value);
    props.onFilterChange(props.name, value); // העברת הערכים הנבחרים
  };

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={selectArray}
      onChange={handleChange}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{ direction: "rtl" }}>
          <Checkbox style={{ marginRight: 8 }} checked={selected} />
          {option}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.name}
          placeholder="בחר"
          sx={{
            backgroundColor: "white",
            borderRadius: "15px",
            height: "50px",
            direction: "rtl",

            "& .MuiInputLabel-root": {
              textAlign: "right",
              right: 50,
              left: "auto",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
            },
          }}
        />
      )}
      sx={{
        minWidth: "15vw",
        "& .MuiAutocomplete-inputRoot": {
          height: "50px",
        },
        "& .MuiOutlinedInput-root": {
          height: "50px",
          border: "none",
        },
      }}
    />
  );
};
