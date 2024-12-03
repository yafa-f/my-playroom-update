import React, { useEffect, useState } from "react";
import "./TakingHistory.css";
import { UserTitle } from "../UserScreen/userTitle";
import { useSelector } from "react-redux";

export const TakingHistory = () => {
  const forAgesFromStore = useSelector((state) => state.forAge.forAges).data;
  const typesGamesFromStore = useSelector((state) => state.typeGame.typesGames);
  const [filteredList, setFilteredList] = useState();
  const singleUser = useSelector((state) => state.singleUser.singleUser);
  const takeOrReturn = useSelector(
    (state) => state.takingOrReturning.takingsOrReturnings
  );
  useEffect(() => {
    const filteredL = takeOrReturn.filter(
      (item) =>
        item.UserCode === singleUser.userCode &&
        item.ActualReturnDate !== undefined
    );
    setFilteredList(filteredL);
  }, [takeOrReturn, singleUser.userCode]);
    const games = useSelector((state) => state.game.games);
    const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="single-user-history">
      <UserTitle
        name={singleUser.userName}
        phone={singleUser.phone}
        cellphone={singleUser.cellphone}
      ></UserTitle>
      <div className="single-user-take-title-history">
        <div className="single-user-take-logo-history"></div>
        <div className="single-user-titleTake-history">הסטורית השאלות</div>
      </div>
      <div className="single-table-title-history">
        <div className="single-taket-h3-history">פרטי המשחק</div>
        <div className="single-taket-h3-history">תאריך השאלה</div>
        <div className="single-taket-h3-history">תאריך החזרה</div>
        <div className="single-taket-h3-history">תאריך החזרה בפועל</div>
      </div>
      <div className="single-user-table-history">
        {filteredList?.map((item, i) => {
          let game = games.find((game) => game.Id == item.GameCode);
          let age = forAgesFromStore.find(
            (a) => a.AgeCode === game?.AgeCode
          )?.Age;

          let tchum = typesGamesFromStore.find(
            (t) => t.gameTypeCode === game?.GameTypeCode
          )?.gameTipeName;

          const parsedDateA = new Date(item.ReturnDate);
          const parsedDateB = new Date(item.ActualReturnDate);

          return game ? (
            <div className="one-item-SU-history" key={i}>
              <div className="game-details-SU-history">
                <div className="game-names-SU-history">{game.GameName}</div>
                <div className="game-names-second-SU-history">
                  <div className="age-SU-history">
                    <div className="child-logo-SU-history"></div>
                    {age}
                  </div>
                  <div className="pas-SU-history">|</div>
                  <div className="type-SU-history">
                    <div className="tchum-SU-history">תחום:</div>
                    <div>{tchum}</div>
                  </div>
                </div>
              </div>

              <div className="date-SU-history">
                <div className="take-date-SU-history">
                  {item?.TakingDate ? formatDate(item.TakingDate) : ""}
                </div>
                <div className="makav-SU-history">-</div>
                <div className="back-date-SU-history">
                  {item?.ReturnDate ? formatDate(item.ReturnDate) : ""}
                </div>
              </div>
              <div className="ActualReturnDate">
                {formatDate(item.ActualReturnDate)}
              </div>
              <div className="comment-history">
                {parsedDateB > parsedDateA ? (
                  <div className="delay-SU-history1">
                    <div className="delay-icon-SU-history"> </div>
                    <div className="delay-message-SU-history">איחור</div>
                  </div>
                ) : (
                  <div></div>
                )}
                {item.IsMissingParts ? (
                  <div className="delay-SU-history2">
                    <div className="delay-icon-SU-history"></div>
                    <div className="delay-message-SU-history">חסרים חלקים</div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              {item.Fine > 0 && (
                <div className="money-fine">
                  <div className="money-icon"></div>
                  <div className="fine-msg">{`${item.Fine} ש"ח`}</div>
                </div>
              )}
            </div>
          ) : (
            <div></div>
          );
        })}
      </div>
    </div>
  );
};
