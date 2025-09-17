import { useState } from "react";
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
  const [circleFlag, setCircleFlag] = useState(false);
  const [status, setStatus] = useState(null);
  const games = useSelector((state) => state.game.games);
  const availableGames = games.filter((game) => game.IsAvailable !== false);
  const singleUser = useSelector((state) => state.singleUser.singleUser);
  const [selectedGames, setSelectedGames] = useState([{}]);
  const gamesMissing = useSelector(
    (state) => state.gamesWithMissingPart.gamesWithMissingParts
  );
  const existingReturnIDs = useSelector((state) =>
    state.takingOrReturning.takingsOrReturnings.map((item) => item.ReturnID)
  );

  const closeAdd = () => navigate("/singleUser/Taking_Returning");
  const addTakeGame = () => setSelectedGames((prev) => [...prev, {}]);
  const selectGameName = (index) => (e) => {
    const selectedGameId = e.target.value;
    setSelectedGames((prev) => {
      const newSelectedGames = [...prev];
      newSelectedGames[index] = availableGames.find(
        (game) => game._id === selectedGameId
      );
      return newSelectedGames;
    });
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
    const formattedReturnDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    const results = await Promise.all(
      selectedGames.map(async (game) => {
        const take = {
          IsMissingParts: game.CurrentStateOfGame !== "תקין",
          ReturnDate: formattedReturnDate,
          TakingDate: new Date().toISOString().split("T")[0],
          Game_id: game._id,
          User_id: singleUser._id,
          ReturnID: generateUniqueReturnID(existingReturnIDs),
        };
        const addResponse = await NewTakeFunction(take);
        if (addResponse && !addResponse.err) {
          const updatedGame = { ...game, IsAvailable: false };
          const updateGame = await UpdateGameTOR(updatedGame);
          if (updateGame) dispatch(UPDATE_GAME(updateGame));
          dispatch(ADD_TOR(take));
          return { name: game.GameName, success: true };
        }
        return { name: game.GameName, success: false };
      })
    );

    setCircleFlag(false);
    const failureMessages = results
      .filter((result) => !result.success)
      .map((result) => result.name);
    if (failureMessages.length > 0) {
      setStatus("error");
    } else {
      setStatus("success");
      setTimeout(closeAdd, 3000);
    }
  };
  const handleDeleteTakegame = (index) => {
    setSelectedGames((prev) =>
      prev.length === 1 ? [{}] : prev.filter((_, i) => i !== index)
    );
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
          <div className="place-row">ארון</div>
          <div className="plus-icon-take" onClick={addTakeGame}></div>
        </div>

        {selectedGames.map((selectedGame, index) => {
       
          const missP =
            selectedGame?.CurrentStateOfGame === "חסרים חלקים"
              ? gamesMissing.find((g) => g._id === selectedGame?._id)
              : null;

          return (
            <div key={index}>
              <div className="new-hashala">
                <div style={{ width: "80vw", display: "inline-flex" }}>
                  <select
                    onChange={selectGameName(index)}
                    className="select-game-take"
                  >
                    <option value="" disabled selected>
                      בחר משחק
                    </option>
                    {availableGames.map((game) => (
                      <option key={game._id} value={game._id}>
                        {game.GameName}
                      </option>
                    ))}
                  </select>
                  {selectedGame && (
                    <>
                      <div className="status-row">
                        {selectedGame?.CurrentStateOfGame}
                      </div>
                      <div className="ages-row">{selectedGame?.Age}</div>
                      <div className="tchum-row">{selectedGame?.GameType}</div>
                      <div className="place-row">{`${selectedGame?.ClosetNumber}`}</div>

                      <div className="Complementar-Available-take">
                        {selectedGame?.HaveComplementaryGame === true ? (
                          <div className="Complementar-take">
                            <div className="v-logo-take"></div>קיים משחק משלים
                          </div>
                        ) : null}
                        {selectedGame?.IsAvailable === true ? (
                          <div className="Available-take">
                            <div className="v-logo-take"></div>זמין להשאלה
                          </div>
                        ) : null}
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
                  {selectedGame.Parts && Array.isArray(selectedGame.Parts) && (
                    <div className="parts-game-take">
                      <div className="game-parts-name-take">חלקים במשחק</div>
                      <div className="parts-table-take">
                        {selectedGame.Parts.map((part, p) => (
                          <div key={p} className="parts-take">
                            <div>{part["כמות"]}</div>
                            <div>{part["שם החלק"]}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedGame.CurrentStateOfGame === "חסרים חלקים" &&
                    missP &&
                    missP.MissingParts && (
                      <div className="missParts">
                        <div style={{ display: "block" }}>
                          <div className="game-parts-name-take">
                            חלקים חסרים במשחק:
                          </div>
                          <div className="parts-table">
                            {missP.MissingParts[0].rows.map(
                              (part, j) =>
                                part.amount - part.afterReturn > 0 && (
                                  <div key={j} className="parts">
                                    <div>{part.amount - part.afterReturn}</div>
                                    <div>{part.name}</div>
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          );
        })}
        {selectedGames[0]?.GameName && (
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

