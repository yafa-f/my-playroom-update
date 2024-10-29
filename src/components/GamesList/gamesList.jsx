import React, { useState } from "react";
import "./gamesList.css";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { AccordionDetails, AccordionSummary, Accordion } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteGame from "../DeleteFunctions/DeleteGame/deleteGame";
import { DELETE_GAME } from "../../app/slices/gameSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SearchButtons } from "./SearchButtons";

export const GamesList = () => {
  const searchNames = [
    { name: "תחום" },
    { name: "טווח גילאים" },
    { name: "סטטוס משחק" },
    { name: "מס’ ארון" },
    { name: "סטטוס השאלה" },
  ];
  const navigate = useNavigate();
  const games = useSelector((state) => state.game.games);
  const [tableArr, setTableArr] = useState();
  useEffect(() => {
    setTableArr(games);
  }, [games]);
  // useEffect(() => {}, [games]);
  const dispatch = useDispatch();
  const navToNewGame = (gameToUpdate) => {
    navigate(`/GamesList/NewGame/bool/${"true"}`, { state: { gameToUpdate } });
  };
  const NewGame = () => {
    navigate(`/GamesList/NewGame/bool/${"false"}`);
  };
  const deleteAgame = async (game) => {
    const deletedGameRow = await DeleteGame(game);
    dispatch(DELETE_GAME(game));
  };
  return (
    <div></div>
  )
}
