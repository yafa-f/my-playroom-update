import React, { useState } from "react";
import "./gamesList.css";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { AccordionDetails, AccordionSummary, Accordion } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteGame from "../../DeleteFunctions/deleteGame";
import { DELETE_GAME } from "../../../app/slices/gameSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SearchButtons } from "./SearchButtons";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import StyleIcon from "@mui/icons-material/Style";
import { generatePDF } from "../../exporttopdf/exportToPDF";
import { stickerPDF } from "../../exporttopdf/exportSticker";
export const GamesList = () => {
  const searchNames = [
    { name: "תחום" },
    { name: "טווח גילאים" },
    { name: "מס’ ארון" },
  ];
  const navigate = useNavigate();
  const games = useSelector((state) => state.game.games);
  const usersFromStore = useSelector((state) => state.user.users).data;
  const typesGamesFromStore = useSelector((state) => state.typeGame.typesGames);
  const closetFromStore=useSelector((state) => state.closet.closets);
  const torFromStore = useSelector(
    (state) => state.takingOrReturning.takingsOrReturnings
  );
  const gamesMissing = useSelector(
    (state) => state.gamesWithMissingPart.gamesWithMissingParts
  ).data;
  const forAgesFromStore = useSelector((state) => state.forAge.forAges).data;
  const [tableArr, setTableArr] = useState();
  const [filters, setFilters] = useState({});

  const handleFilterChange = (filterName, chosenUser) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: chosenUser,
    }));
  };


  useEffect(() => {
    let filteredGames = games;

    Object.keys(filters).forEach((filter) => {
      if (filters[filter]?.length) {
        switch (filter) {
          case "תחום":
            const types = typesGamesFromStore
              .filter((t) => filters[filter].includes(t.gameTipeName))
              .map((t) => t.gameTypeCode);
            filteredGames = filteredGames.filter((game) =>
              types.includes(game.GameTypeCode)
            );
            break;
          case "טווח גילאים":
            const ages = forAgesFromStore
              .filter((a) => filters[filter].includes(a.Age))
              .map((a) => a.AgeCode);
            filteredGames = filteredGames.filter((game) =>
              ages.includes(game.AgeCode)
            );
            break;
            case "מס’ ארון":
              const cabinets = closetFromStore
                .filter(c => filters[filter].includes(c.closetCode))
                .map(c => c.closetCode);
              filteredGames = filteredGames.filter(game => cabinets.includes(game.ClosetNumber));
              break;
              default:
            break;
        }
      }
    });

    setTableArr(filteredGames);
  }, [games, filters]);


  const userName = (Id) => {
    let gameTake = torFromStore.filter((tg) => tg.GameCode === Id);
    if (gameTake.length === 0) {
      return "No user found";
    }
    let closestDateObject = gameTake.reduce((closest, current) => {
      let currentDate = new Date(current.TakingDate);
      let closestDate = new Date(closest.TakingDate);

      return Math.abs(currentDate - new Date()) <
        Math.abs(closestDate - new Date())
        ? current
        : closest;
    }, gameTake[0]);

    let user = usersFromStore.find(
      (u) => u.userCode === closestDateObject.UserCode
    )?.userName;
    return user || "Unknown User"; 
  };
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
  const formatNestedObjects = (data) => {
    return data.map(({ _id, GameCode, ...item }) => {
      return {
        ...item,
        Parts: item.Parts.map((part) => `${part.name} ${part.amount}`).join(
          ", "
        ), 
      };
    });
  };
  const printAsticker = (game) => {
    const data = { code: game.Id, name: game.GameName };
    const color = typesGamesFromStore.find(
      (t) => t.gameTypeCode === game.GameTypeCode
    ).stickerColor;
    console.log("color", color);
    if (color) {
      stickerPDF(data, color);
    } else stickerPDF(data, "green");
  };
  const exportToPDF = () => {
    const columns = [
      "קוד משחק",
      "קוד ארון",
      "שם משחק",
      "תחום משחק",
      "חלקי משחק",
      "המשחק מיועד לגילאי",
      "מצב משחק",
      "מדבקה?",
      "משחק משלים?",
      "מיקום הארון",
      "זמין להשאלה?",
      "מיקום בארון",
    ];
    const formattedData = formatNestedObjects(tableArr);
    const title = "משחקים";
    generatePDF(columns, formattedData, title);
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
            משחק +
          </Button>
        </div>
        <div className="search-buttons-game">
          {Array.isArray(searchNames) &&
            (searchNames || [])?.map((search, i) => (
              <div id={i}>
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
          <div className="h-3-ga">מיקום</div>
          <div className="h-3-ga">סטטוס השאלה</div>
          <div className="pdf-icon" onClick={() => exportToPDF()}>
            <PictureAsPdfIcon sx={{ color: "rgba(6, 120, 252, 1)" }} />
          </div>
        </div>
        <div className="G-table">
          <section className="section">
            {Array.isArray(tableArr) &&
              tableArr.map((game, i) => {
                let missP;
                let age = forAgesFromStore.find(
                  (a) => a.AgeCode === game.AgeCode
                )?.Age;
                let tchum = typesGamesFromStore.find(
                  (t) => t.gameTypeCode === game.GameTypeCode
                )?.gameTipeName;
                if (game.CurrentStateOfGame == "חסרים חלקים") {
                  missP = gamesMissing.find((g) => g.Id === game.Id);
                }
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
                            {game.HaveComplementaryGame === "TRUE" ||
                            game.HaveComplementaryGame === "true" ? (
                              <div className="Complementar">
                                <div className="v-logo"></div>קיים משחק משלים
                              </div>
                            ) : (
                              <div></div>
                            )}
                            {game.IsAvailable === "TRUE" ||
                            game.IsAvailable === "true" ? (
                              <div className="Available">
                                <div className="v-logo"></div>זמין להשאלה
                              </div>
                            ) : (
                              <div></div>
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
                            ></StyleIcon>
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
                        {game.CurrentStateOfGame == "חסרים חלקים" &&
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
                                      (part, j) => (
                                        <>
                                          {part.amount - part.afterReturn >
                                            0 && (
                                            <div key={j} className="parts">
                                              <div>
                                                (
                                                {part.amount - part.afterReturn}
                                                )
                                              </div>
                                              <div>{part.name}</div>
                                            </div>
                                          )}
                                        </>
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
    </div>
  );
};
