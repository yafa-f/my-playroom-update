import React from "react";
import { useState, useEffect } from "react";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import "./gamesList.css";

export const SearchButtons = (props) => {
  const [selectArray, setSelectArray] = useState([]);
  const [chosenUsers, setChosenUsers] = useState([]);
  const typesGames = useSelector((state) => state.typeGame.typesGames) || [];
  const actuliGame =
    useSelector((state) => state.actualiGames.actualiGames) || [];
  const gameSkills = useSelector((state) => state.gameSkills.gameSkills) || [];
  const forAges = useSelector((state) => state.forAge.forAges) || [];
  const closets = useSelector((state) => state.closet.closets) || [];

  const take =
    useSelector((state) => state.takingOrReturning.takingsOrReturnings) || [];
  const users = useSelector((state) => state.user.users) || [];
  const games = useSelector((state) => state.game.games) || [];

  useEffect(() => {
    switch (props.name) {
      case "תחום":
        {
          const type = typesGames.map((item) => item.GameType) || [];
          setSelectArray(type);
        }
        break;
      case "אקטואליה":
        {
          const actuali = actuliGame.map((item) => item.ActuliGame) || [];
          setSelectArray(actuali);
        }
        break;
      case "מיומנות":
        {
          const skill = gameSkills.map((item) => item.GameSkills) || [];
          setSelectArray(skill);
        }
        break;
      case "טווח גילאים":
        {
          const age = forAges.map((item) => item.age);
          setSelectArray(age);
        }
        break;

      case "מס’ ארון":
        {
          const closetCodes = closets.map((item) => item.closet);
          setSelectArray(closetCodes);
        }
        break;

      default:
        setSelectArray([]);
    }
  }, [
    props.name,
    typesGames,
    actuliGame,
    gameSkills,
    forAges,
    closets,
    take,
    users,
    games,
  ]);
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
