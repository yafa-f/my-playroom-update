import React from "react";
import { useSelector } from "react-redux";
import "./typeOfGameList.css";
export const TypeOfGameList = () => {
  const types = useSelector((state) => state.typeGame.typesGames);
  return (
    <div className="types">
      <div className="types-title">
        <div className="type-logo"></div>
        <div className="titleType">תחומי משחק</div>
      </div>
      <div className="table-title">
        <div className="h-3-type ">קוד תחום</div>
        <div className="h-3-type ">תחום</div>
        <div className="h-3-type ">צבע מדבקה</div>
      </div>
      <div className="types-table">
        <section className="section">
          {Array.isArray(types) &&
            types.map((item, i) => {
              return (
                <div className="one-item" key={i}>
                  <div className="type-code">{item.gameTypeCode}</div>
                  <div className="type-game">{item.gameTipeName}</div>
                  <div className="sticker-Color">{item.stickerColor}</div>
                </div>
              );
            })}
        </section>
      </div>
    </div>
  );
};
