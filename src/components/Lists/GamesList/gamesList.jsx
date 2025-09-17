import React, { useState, useEffect } from "react";
import "./gamesList.css";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteGame from "../../DeleteFunctions/deleteGame";
import { DELETE_GAME } from "../../../app/slices/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchButtons } from "./SearchButtons";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import StyleIcon from "@mui/icons-material/Style";
import { generatePDF } from "../../exporttopdf/exportToPDF";
import { stickerPDF } from "../../exporttopdf/exportSticker";

export const GamesList = () => {
  const searchNames = [
    { name: "תחום" },
    { name: "אקטואליה" },
    { name: "מיומנות" },
    { name: "מס’ ארון" },
    { name: "טווח גילאים" },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const games = useSelector((state) => state.game.games);
  const usersFromStore = useSelector((state) => state.user.users);
  const torFromStore = useSelector(
    (state) => state.takingOrReturning.takingsOrReturnings
  );
  const gamesMissing = useSelector(
    (state) => state.gamesWithMissingPart.gamesWithMissingParts
  );
  const [tableArr, setTableArr] = useState([]);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (filterName, chosenUser) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: chosenUser,
    }));
  };

  useEffect(() => {
    let filteredGames = [...games];
  
    const fieldMap = {
      "תחום": "GameType",
      "אקטואליה": "ActualiGame",
      "מיומנות": "GameSkills",
      "טווח גילאים": "Age",
      "מס’ ארון": "ClosetNumber",
      "סטטוס משחק": "CurrentStateOfGame",
    };
  
    Object.keys(filters).forEach((filter) => {
      const selectedValues = filters[filter];
      if (selectedValues && selectedValues.length > 0) {
        if (filter === "סטטוס השאלה") {
          filteredGames = filteredGames.filter((game) => {
            if (selectedValues.includes("מושאל") && !game.IsAvailable)
              return true;
            if (selectedValues.includes("במשחקייה") && game.IsAvailable)
              return true;
            return false;
          });
          return;
        }
  
        const fieldName = fieldMap[filter];
        if (!fieldName) return;
  
        filteredGames = filteredGames.filter((game) => {
          const value = game[fieldName];
  
          if (Array.isArray(value)) {
            // חייב להכיל את כל הערכים שנבחרו
            return selectedValues.every((val) => value.includes(val));
          } else {
            // ערך בודד
            return selectedValues.includes(
              value || (fieldName === "CurrentStateOfGame" ? "תקין" : value)
            );
          }
        });
      }
    });
  
    setTableArr(filteredGames);
  }, [games, filters]);
  
  
  const userName = (_id) => {
    let gameTake = torFromStore.filter((tg) => tg.Game_id === _id);
    if (!gameTake.length) return "No user found";

    let closestDateObject = gameTake.reduce((closest, current) => {
      return new Date(current.TakingDate) < new Date(closest.TakingDate)
        ? current
        : closest;
    });

    return (
      usersFromStore.find((u) => u._id === closestDateObject.User_id)
        ?.userName || "Unknown User"
    );
  };

  const navToNewGame = (gameToUpdate) => {
    navigate(`/GamesList/NewGame/bool/true`, { state: { gameToUpdate } });
  };

  const NewGame = () => {
    navigate(`/GamesList/NewGame/bool/false`);
  };
const deleteAgame = async (game) => {
  const isDeleted = await DeleteGame(game);

  if (isDeleted) {
    dispatch(DELETE_GAME(game)); // מחיקה מה־Redux רק אם באמת נמחק
  }
};

  const formatNestedObjects = (data) => {
    return data.map(({ _id, ...item }) => ({
      ...item,
      Parts: item.Parts.map(
        (part) => `${part["שם החלק"]} ${part["כמות"]}`
      ).join(", "),
    }));
  };

  const printAsticker = (game) => {
    const color = "green"; // צבע קבוע כי כבר אין `GameTypeCode`
    stickerPDF({ code: game._id, name: game.GameName }, color);
  };

  const exportToPDF = () => {
    const columns = [
      "קוד מזהה",
      "שם משחק",
      "תחום משחק",
      "מיומנויות", // חדש
      "אקטואליה", // חדש
      "חלקי משחק",
      "טווח גילאים",
      "מצב משחק",
      "משחק משלים?",
      "זמין להשאלה?",
    ];
    const formattedData = formatNestedObjects(tableArr);
    generatePDF(columns, formattedData, "משחקים");
  };

  return (
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
          משחק +
        </Button>
      </div>

      <div className="search-buttons-game">
        {searchNames.map((search, i) => (
          <div key={i}>
            <SearchButtons
              name={search.name}
              list={games}
              onFilterChange={handleFilterChange}
            />
          </div>
        ))}
      </div>

      <div className="table-title">
        <div className="h-3-ga-ty">פרטי משחק</div>
        <div className="h-3-ga">סטטוס</div>
        <div className="h-3-ga">ארון</div>
        <div className="h-3-ga">סטטוס השאלה</div>
        <div className="pdf-icon" onClick={exportToPDF}>
          <PictureAsPdfIcon sx={{ color: "rgba(6, 120, 252, 1)" }} />
        </div>
      </div>

      <div className="G-table">
        <section className="section">
          {Array.isArray(tableArr) &&
            tableArr?.map((game, i) => {
              let missP =
                game.CurrentStateOfGame === "חסרים חלקים" &&
                gamesMissing?.find((g) => g._id === game._id);

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
                    >
                      <div className="game-column">
                        <div className="game-details">
                          <div className="game-names">{game.GameName}</div>
                          <div className="game-names-second">
                            <div className="age">
                              <div className="child-logo"></div>
                              {Array.isArray(game.Age) &&
                                game.Age.map((age, i) => (
                                  <span key={i} className="chip">
                                    {age}
                                  </span>
                                ))}{" "}
                            </div>
                            <div className="pas">|</div>
                            <div className="type">
                              <div className="tchum">תחום:</div>
                              {Array.isArray(game.GameType) &&
                                game.GameType.map((type, i) => (
                                  <span key={i} className="chip">
                                    {type}
                                  </span>
                                ))}{" "}
                            </div>

                            {/* מיומנויות */}
                            {Array.isArray(game.GameSkills) &&
                              game.GameSkills.length > 0 && (
                                <>
                                  <div className="pas">|</div>
                                  <div className="skills">
                                    <div className="tchum">מיומנויות:</div>
                                    {game.GameSkills.map((skill, i) => (
                                      <span key={i} className="chip">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </>
                              )}

                            {/* אקטואליה */}
                            {Array.isArray(game.ActualiGame) &&
                              game.ActualiGame.length > 0 && (
                                <>
                                  <div className="pas">|</div>
                                  <div className="actuali">
                                    <div className="tchum">אקטואליה:</div>
                                    {game.ActualiGame.map((item, i) => (
                                      <span key={i} className="chip">
                                        {item}
                                      </span>
                                    ))}
                                  </div>
                                </>
                              )}
                          </div>
                        </div>
                        <div className="status">
                          <div
                            className={`CurrentStateOfGame ${
                              game.CurrentStateOfGame === "תקין" ||
                              !game.CurrentStateOfGame
                                ? "green"
                                : game.CurrentStateOfGame === "חסרים חלקים"
                                ? "red"
                                : ""
                            }`}
                          ></div>
                          <div>{game.CurrentStateOfGame || "תקין"}</div>
                        </div>
                        <div className="place">
                          <div className="closet-logo"></div>
                          <div className="closet-number">
                            {game.ClosetNumber}
                          </div>
                        </div>
                        <div className="game-mushal">
                          {game.IsAvailable ? (
                            <div style={{ display: "inline-flex" }}>
                              <div className="no-mushal-logo"></div>
                              <div className="mushal">במשחקיה</div>
                            </div>
                          ) : (
                            <div style={{ display: "inline-flex" }}>
                              <div className="mushal-logo"></div>
                              <div className="mushal">מושאל</div>
                              <div className="pas">|</div>
                              <div>{userName(game._id)}</div>
                            </div>
                          )}
                        </div>
                        <div className="Complementar-Available">
                          {game.HaveComplementaryGame && (
                            <div className="Complementar">
                              <div className="v-logo"></div>קיים משחק משלים
                            </div>
                          )}
                          {game.IsAvailable && (
                            <div className="Available">
                              <div className="v-logo"></div>זמין להשאלה
                            </div>
                          )}
                        </div>
                        <div className="update-delete-icons">
                          <div
                            className="update-icon"
                            onClick={() => navToNewGame(game)}
                          ></div>
                          <div
                            className="delete-icon"
                            onClick={() => deleteAgame(game)}
                          ></div>
                          <StyleIcon
                            onClick={() => printAsticker(game)}
                            className="sticker"
                            sx={{ color: "rgba(6, 120, 252, 1)" }}
                          />
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
                                  <div>({part["כמות"]})</div>
                                  <div>{part["שם החלק"]}</div>
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
                                  total + (Number(part["כמות"]) || 0),
                                0
                              )}
                              )
                            </div>
                          </div>
                        </div>
                        <div className="acordi-comment">{game.Comment}</div>
                      </div>
                      {game.CurrentStateOfGame === "חסרים חלקים" &&
                        missP &&
                        missP.MissingParts && (
                          <div className="AccordionDetails-missParts">
                            <div className="game-parts">
                              <div style={{ display: "block" }}>
                                <div className="game-parts-name">
                                  חלקים חסרים במשחק:
                                </div>
                                <div className="parts-table">
                                  {missP.MissingParts[0].rows.map(
                                    (part, j) =>
                                      part.amount - part.afterReturn > 0 && (
                                        <div key={j} className="parts">
                                          <div>
                                            ({part.amount - part.afterReturn})
                                          </div>
                                          <div>{part.name}</div>
                                        </div>
                                      )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                    </AccordionDetails>
                  </Accordion>
                </div>
              );
            })}
        </section>
      </div>
    </div>
  );
};
