import React, { useState } from "react";
import "./newTake.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewTakeFunction from "../../AddFunctions/NewTakeFunction";
import { UPDATE_GAME } from "../../../app/slices/gameSlice";
import { ADD_TOR } from "../../../app/slices/takeOrReturnSlice";
import UpdateGameTOR from "../../UpdateFunction/UpdateGameTOR";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export const AddTake = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("אישור");
  const [circleFlag, setCircleFlag] = useState(false);
  const [status, setStatus] = useState(null);
  const games = useSelector((state) => state.game.games);
  const availableGames = games.filter((game) => game.IsAvailable !== "FALSE");
  const singleUser = useSelector((state) => state.singleUser.singleUser);
  const typesGamesFromStore = useSelector((state) => state.typeGame.typesGames);
  const forAgesFromStore = useSelector((state) => state.forAge.forAges).data;
  const [selectedGames, setSelectedGames] = useState([{}]);
  const gamesMissing = useSelector(
    (state) => state.gamesWithMissingPart.gamesWithMissingParts
  ).data;
  const existingReturnIDs = useSelector((state) =>
    state.takingOrReturning.takingsOrReturnings.map((item) => item.ReturnID)
  );
  const closeAdd = () => {
    navigate("/singleUser/Taking_Returning");
  };
  const addTakeGame = () => {
    setSelectedGames((prevSelectedGames) => [...prevSelectedGames, {}]);
  };
  const selectGameName = (index) => (e) => {
    const selectedGameId = e.target.value;
    const newSelectedGames = [...selectedGames];
    newSelectedGames[index] = availableGames.find(
      (game) => game.Id === selectedGameId
    );
    setSelectedGames(newSelectedGames);
  };
  const generateUniqueReturnID = (existingIDs) => {
    let newID;
    do {
      newID = Math.floor(Math.random() * 10000);
    } while (existingIDs.includes(String(newID)));
    return String(newID);
  };

  const ApprovalTake = async () => {
    setCircleFlag(true);
    setButtonText("הוספת השאלות בתהליך...");
    const ReturnDate = new Date();
    ReturnDate.setDate(ReturnDate.getDate() + 14);
    const formattedReturnDate = ReturnDate.toISOString().split("T")[0];
    const results = await Promise.all(
      selectedGames.map(async (game) => {
        let take = {
          IsMissingParts: game.CurrentStateOfGame === "תקין" ? false : true,
          ReturnDate: formattedReturnDate,
          TakingDate: new Date().toISOString().split("T")[0],
          GameCode: game.Id,
          UserCode: singleUser.userCode,
          ReturnID: generateUniqueReturnID(existingReturnIDs),
        };
        const addResponse = await NewTakeFunction(take);
        if (addResponse && addResponse.ok) {
          let gameForUpdate = { ...game, IsAvailable: "FALSE" };
          const updateGame = await UpdateGameTOR(gameForUpdate);
          if (updateGame) {
            dispatch(UPDATE_GAME(updateGame));
          } else {
            console.error("Failed to update tor game object");
          }
          dispatch(ADD_TOR(take));
          return { name: game.GameName, success: true };
        } else {
          return { name: game.GameName, success: false };
        }
      })
    );

    setCircleFlag(false);
    const successMessages = results
      .filter((result) => result.success)
      .map((result) => result.name);
    const failureMessages = results
      .filter((result) => !result.success)
      .map((result) => result.name);

    if (failureMessages.length > 0) {
      setStatus("error");
      setButtonText(`נכשל עבור: ${failureMessages.join(", ")}`);
    } else {
      setStatus("success");
      setButtonText("כל ההשאלות נוספו בהצלחה!");
      setTimeout(() => {
        navigate("/singleUser/Taking_Returning");
      }, 3000);
    }
  };
  const handleDeleteTakegame = (index) => {
    if (selectedGames.length == 1) {
      setSelectedGames([{}]);
    } else {
      const newRows = selectedGames.filter((_, i) => i !== index);
      setSelectedGames(newRows);
    }
  };
  return (
    <div className="add-take-screen">
      <div className="nav-bar-AddTake">
        <div className="add-title">הוספת השאלה</div>
        <div className="user-icon-add"></div>
        <div className="user-name-add">{singleUser.userName}</div>
        <div className="close-add" onClick={closeAdd}>
          x
        </div>
      </div>
      <div className="img-back"></div>
      <div className="add-form">
        <div className="add-form-title">
          <div className="game-name-row">שם המשחק</div>
          <div className="status-row">סטטוס</div>
          <div className="ages-row">טווח גילאים</div>
          <div className="tchum-row">תחום</div>
          <div className="place-row">מיקום</div>
          <div className="plus-icon-take" onClick={addTakeGame}></div>
        </div>

        {selectedGames &&
          selectedGames.length > 0 &&
          selectedGames.map((selectedGame, index) => {
            let missP;
            let age = forAgesFromStore.find(
              (a) => a.AgeCode === selectedGame.AgeCode
            )?.Age;
            let tchum = typesGamesFromStore.find(
              (t) => t.gameTypeCode === selectedGame.GameTypeCode
            )?.gameTipeName;
            if (selectedGame.CurrentStateOfGame == "חסרים חלקים") {
              missP = gamesMissing.find((g) => g.Id === selectedGame.Id);
            }
            return (
              <div key={index}>
                <div className="new-hashala">
                  {" "}
                  <div style={{ width: "80vw", display: "inline-flex" }}>
                    <select
                      onChange={selectGameName(index)}
                      className="select-game-take"
                    >
                      <option value="" disabled selected>
                        בחר משחק
                      </option>
                      {availableGames.map((game) => (
                        <option key={game.Id} value={game.Id}>
                          {game.GameName}
                        </option>
                      ))}
                    </select>
                    {selectedGame && (
                      <>
                        <div className="status-row">
                          {selectedGame.CurrentStateOfGame}
                        </div>
                        <div className="ages-row">{age}</div>
                        <div className="tchum-row">{tchum}</div>
                        <div className="place-row">
                          {selectedGame.ClosetNumber}
                          {selectedGame.Location}
                        </div>
                        <div className="Complementar-Available-take">
                          {selectedGame.HaveComplementaryGame === "on" ||
                          selectedGame.HaveComplementaryGame === "TRUE" ? (
                            <div className="Complementar-take">
                              <div className="v-logo-take"></div>קיים משחק משלים
                            </div>
                          ) : (
                            <div></div>
                          )}
                          {selectedGame.IsAvailable === "on" ||
                          selectedGame.IsAvailable === "TRUE" ? (
                            <div className="Available-take">
                              <div className="v-logo-take"></div>זמין להשאלה
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  <div
                    className="garb-icon-take"
                    onClick={() => handleDeleteTakegame(index)}
                  ></div>
                </div>
                {selectedGame && (
                  <div
                    style={{
                      display: "inline-flex",
                      borderBottom: "1px rgba(230, 230, 230, 1) solid",
                      width: "90vw",
                      marginRight: "5vw",
                    }}
                  >
                    {selectedGame &&
                      selectedGame.Parts &&
                      Array.isArray(selectedGame.Parts) && (
                        <div className="parts-game-take">
                          <div className="game-parts-name-take">
                            חלקים במשחק
                          </div>
                          <div className="parts-table-take">
                            {selectedGame.Parts.map((part, p) => (
                              <div key={p} className="parts-take">
                                <div>{part.amount}</div>
                                <div>{part.name}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    {selectedGame.CurrentStateOfGame == "חסרים חלקים" &&
                      missP &&
                      missP.MissingParts && (
                        <div className="missParts">
                          <div style={{ display: "block" }}>
                            <div className="game-parts-name-take">
                              חלקים חסרים במשחק:
                            </div>
                            <div className="parts-table">
                              {missP.MissingParts[0].rows.map((part, j) => (
                                <>
                                  {part.amount - part.afterReturn > 0 && (
                                    <div key={j} className="parts">
                                      <div>
                                        {part.amount - part.afterReturn}
                                      </div>
                                      <div>{part.name}</div>
                                    </div>
                                  )}
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            );
          })}
        {selectedGames[0].GameName && (
          <button onClick={ApprovalTake} className="Approval-take-btn">
            {circleFlag ? (
              <CircularProgress size={24} color="white" />
            ) : status === "success" ? (
              <CheckIcon />
            ) : status === "error" ? (
              <CloseIcon />
            ) : (
              "אישור"
            )}
          </button>
        )}
      </div>
    </div>
  );
};
