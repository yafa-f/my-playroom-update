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
  useEffect(() => {}, [games]);
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
          {searchNames?.map((search, i) => (
            <div id={i}>
              <SearchButtons name={search.name} setTableArr={setTableArr} />{" "}
            </div>
          ))}
        </div>
        <div className="table-title">
          <h3>פרטי משחק</h3>
          <h3>סטטוס</h3>
          <h3>מיקום</h3>
          <h3>סטטוס השאלה</h3>
        </div>
        <div className="table">
          <section className="section">
            {Array.isArray(tableArr) &&
              tableArr.map((game, i) => (
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
                          {/* <div className="game-names">{game.GameCode}</div> */}
                          <div className="game-names-second">
                            <div className="age">
                              <div className="child-logo"></div>
                              {game.AgeCode}
                            </div>
                            <div className="pas">|</div>
                            <div className="type">
                              <div className="tchum">תחום:</div>
                              <div>{game.GameTypeCode}</div>
                            </div>
                          </div>
                        </div>
                        <div className="status">
                          <div
                            className={`CurrentStateOfGame ${
                              game.CurrentStateOfGame == "תקין"
                                ? "green"
                                : game.CurrentStateOfGame == "חסרים חלקים"
                                ? "red"
                                : ""
                            }`}
                          ></div>
                          <div>{game.CurrentStateOfGame}</div>
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
                          <div className="mushal-logo"></div>
                          <div className="mushal">מושאל</div>
                          {game.IsAvailable == false ? (
                            <div></div>
                          ) : (
                            <>
                              <div className="pas">|</div>
                              <div>רחלי פרידמן</div>
                            </>
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
                          {game.IsAvailable === "on" ||
                          game.IsAvailable === "TRUE" ? (
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
                            <div className="game-parts-name">חלקים במשחק:</div>
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
              ))}
          </section>
        </div>
      </div>
    </div>
  );
};
