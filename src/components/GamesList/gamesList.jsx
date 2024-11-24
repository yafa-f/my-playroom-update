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
  const usersFromStore = useSelector((state) => state.user.users).data;
  const typesGamesFromStore = useSelector((state) => state.typeGame.typesGames);
  const torFromStore = useSelector(
    (state) => state.takingOrReturning.takingsOrReturnings
  );
  const forAgesFromStore = useSelector((state) => state.forAge.forAges).data;
  const closetsFromStore = useSelector((state) => state.closet.closets);
  const [userm, setUserm] = useState(null);

  const [tableArr, setTableArr] = useState();
  const userName=(Id)=>{
    let gameTake = torFromStore.filter((tg) => tg.GameCode === Id);
    
    if (gameTake.length === 0) {
        return "No user found"; // or handle it as needed
    }

    let closestDateObject = gameTake.reduce((closest, current) => {
        let currentDate = new Date(current.TakingDate);
        let closestDate = new Date(closest.TakingDate);

        return Math.abs(currentDate - new Date()) < Math.abs(closestDate - new Date())
            ? current
            : closest;
    }, gameTake[0]);

    let user = usersFromStore.find((u) => u.userCode === closestDateObject.UserCode)?.userName;
    return user || "Unknown User"; // Handle case where user is not found

  }
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
    <div>
      <div className="games">
        <div className="title">
          <div className="game-logo"></div>
          <div className="title-name">משחקים</div>

          <Button
            sx={{
              width: "150px",
              height: "38px",
              top: "20px",
              borderRadius: "28px",
            }}
            variant="contained"
            onClick={NewGame}
          >
            + משחק
          </Button>
        </div>
        <div className="search-buttons">
          {Array.isArray(searchNames) &&
            searchNames?.map((search, i) => (
              <div id={i}>
                <SearchButtons
                  name={search.name}
                  list={games}
                  setTableArr={setTableArr}
                />{" "}
              </div>
            ))}
        </div>
        <div className="table-title">
          <div className="h-3-ga-ty">פרטי משחק</div>
          <div className="h-3-ga">סטטוס</div>
          <div className="h-3-ga">מיקום</div>
          <div className="h-3-ga">סטטוס השאלה</div>
        </div>
        <div className="G-table">
          <section className="section">
            {Array.isArray(tableArr) &&
              tableArr.map((game, i) => {
                let age = forAgesFromStore.find(
                  (a) => a.AgeCode === game.AgeCode
                )?.Age;
                let tchum = typesGamesFromStore.find(
                  (t) => t.gameTypeCode === game.GameTypeCode
                )?.gameTipeName;
              
                return (
                  <div key={i}>
                    <Accordion
                      sx={{
                        direction: "rtl",
                        borderBottom: "2px rgba(6, 120, 252, 0.20) solid",
                      }}
                    >
                      <AccordionSummary
                        sx={{ height: "15vh" }}
                        expandIcon={
                          <ExpandMoreIcon
                            sx={{ color: "rgba(6, 120, 252, 1)" }}
                          />
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <div className="game-column">
                          <div className="game-details">
                            <div className="game-names">{game.GameName}</div>
                            <div className="game-names-second">
                              <div className="age">
                                <div className="child-logo"></div>
                                {age}
                              </div>
                              <div className="pas">|</div>
                              <div className="type">
                                <div className="tchum">תחום:</div>
                                <div>{tchum}</div>
                              </div>
                            </div>
                          </div>
                          <div className="status">
                            <div
                              className={`CurrentStateOfGame ${
                                game.CurrentStateOfGame == "תקין" ||
                                game.CurrentStateOfGame == ""
                                  ? "green"
                                  : game.CurrentStateOfGame == "חסרים חלקים"
                                  ? "red"
                                  : ""
                              }`}
                            ></div>
                            <div>{game.CurrentStateOfGame || "תקין"}</div>
                          </div>
                          <div className="place">
                            <div className="closet-logo"></div>
                            <div className="mikum-in-closet">
                              ({game.PlaceInCloset})
                            </div>
                            <div className="closet-number">
                              {game.ClosetNumber}
                            </div>
                            <div className="closet-place">{game.Location}</div>
                          </div>
                          <div className="game-mushal">
                            {game.IsAvailable != "FALSE" &&
                            game.IsAvailable != "" ? (
                              <div style={{ display: "inline-flex" }}>
                                <div className="no-mushal-logo"></div>
                                <div className="mushal">במשחקיה</div>
                              </div>
                            ) : (
                              <div style={{ display: "inline-flex" }}>
                                <div className="mushal-logo"></div>
                                <div className="mushal">מושאל</div>
                                <div className="pas">|</div>
                                <div>{userName(game.Id)}</div>
                              </div>
                            )}
                          </div>
                          <div className="Complementar-Available">
                            {game.HaveComplementaryGame === "on" ||
                            game.HaveComplementaryGame === "TRUE" ? (
                              <div className="Complementar">
                                <div className="v-logo"></div>קיים משחק משלים
                              </div>
                            ) : (
                              <div></div>
                            )}
                            {game.IsAvailable !== "FALSE" ? (
                              <div className="Available">
                                <div className="v-logo"></div>זמין להשאלה
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                          <div className="update-delete-icons">
                            <Button
                              onClick={() => navToNewGame(game)}
                              size="small"
                              sx={{ width: "2px" }}
                            >
                              <div className="update-icon"></div>
                            </Button>
                            <Button
                              onClick={() => deleteAgame(game)}
                              size="small"
                            >
                              <div className="delete-icon"></div>
                            </Button>
                          </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="AccordionDetails">
                          <div className="game-parts">
                            <div style={{ display: "block" }}>
                              <div className="game-parts-name">
                                חלקים במשחק:
                              </div>
                              <div className="parts-table">
                                {game.Parts.map((part, j) => (
                                  <div key={j} className="parts">
                                    <div>
                                      ({part.amount}
                                      {part.amont})
                                    </div>
                                    <div>{part.name}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="sum">
                              סה"כ:
                              <div className="sum-number">
                                (
                                {game.Parts.reduce(
                                  (total, part) =>
                                    total +
                                    (Number(part.amount) || Number(part.amont)),
                                  0
                                )}
                                )
                              </div>
                            </div>
                          </div>
                          <div className="acordi-comment">{game.Comment}</div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                );
              })}
          </section>
        </div>
      </div>
    </div>
  );
};
