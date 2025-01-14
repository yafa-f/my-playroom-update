import React, { useState } from "react";
import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./gamesWithMissingParts.css";
import deleteGameMissing from "../../DeleteFunctions/deleteGameMissing";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_GAMES_WITH_MISSING_PARTS } from "../../../app/slices/gamesWiteMissingPartsSlice";
export const GamesWithMissingPartsList = () => {
  const gamesMissing = useSelector(
    (state) => state.gamesWithMissingPart.gamesWithMissingParts
  );
  const dispatch = useDispatch();
  const handleDeleteGameMissing = async (item) => {
    const deleteCurrentItem = await deleteGameMissing(item);
    dispatch(DELETE_GAMES_WITH_MISSING_PARTS(item));
    alert("נמחק");
  };
  let MAX_HEIGHT = 2;
  const [counter, setCounter] = useState(0);

  const isScrollable = (missingParts) => {
    return missingParts.some((part) => part.rows.length > MAX_HEIGHT);
  };
  
  return (
    <div className="gamesMissing">
      <div className="gmaes-missing-title" style={{display:"inline-flex"}}>
        <div className="titleMissing">משחקים עם חלקים חסרים</div>
        <div className="game-missing-logo"></div>

      </div>
      <div className="table-title">
        <div className="h-3-game ">שם המשחק</div>
        <div className="h-3-game ">מצב החלקים</div>
      </div>
      <div className="games-missing-table">
        <section className="section">
          {Array.isArray(gamesMissing.data) &&
            gamesMissing.data.map((item, i) => {                
              return (
                <div
                  className="one-item"
                  key={i}
                  style={{
                    paddingLeft: isScrollable(item.MissingParts)===true
                      ? "2px"
                      : "20px",
                  }}
                >
                  <div
                    className="gameMissingName"
                    style={{
                      textAlign: "center",
                      alignContent: "center",
                      marginRight: "2vw",
                      width: "25vw",
                      height: "10vh",
                      borderLeft: "2px rgba(6, 120, 252, 0.2) solid",
                    }}
                  >
                    {item.GameName}
                  </div>
                  {item.MissingParts && (
                    <table className="tbl">
                      <thead>
                        <tr>
                          {item.MissingParts.map((part, j) => (
                            <React.Fragment key={j}>
                              {part.headers.map((header, k) => (
                                <th style={{ width: "19vw" }} key={k}>
                                  {header}
                                </th>
                              ))}
                            </React.Fragment>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {item.MissingParts.map((part, j) =>
                          part.rows.map((row, l) => (
                            <tr key={l}>
                              <td style={{ textAlign: "center" }}>
                                {row.name}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {row.amount}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {row.afterReturn}
                              </td>
                            </tr>
                          ))
                        )}

                      </tbody>
                    </table>
                  )}
                  <Button
                    style={{
                      width: "1px",
                      height: "2px",
                      marginRight: "-10px",
                    }}
                    onClick={() => {
                      handleDeleteGameMissing(item);
                    }}
                  >
                    <DeleteOutlineIcon></DeleteOutlineIcon>{" "}
                  </Button>{" "}
                </div>
              );
            })}
        </section>
      </div>
    </div>
  );
};
