import React from "react";
import "./takeList.css";
import { useState } from "react";
import { SearchButtons } from "../GamesList/SearchButtons";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const TakeList = () => {
  const games = useSelector((state) => state.game.games);
  const users = useSelector((state) => state.user.users).data;
  const [tableArr, setTableArr] = useState();
  const take = useSelector(
    (state) => state.takingOrReturning.takingsOrReturnings
  );
  useEffect(() => {
    const filter = take.filter((item) => item.ActualReturnDate === undefined);
    setTableArr(filter);
  }, [take]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  function calculateDaysBetween(returnDateStr, currentDateStr) {
    const [day1, month1, year1] = returnDateStr.split("/").map(Number);
    const [day2, month2, year2] = currentDateStr.split("/").map(Number);

    const returnDateObj = new Date(year1, month1 - 1, day1);
    const currentDateObj = new Date(year2, month2 - 1, day2);

    const timeDifference = currentDateObj - returnDateObj;
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return dayDifference;
  }
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");
  const [filters, setFilters] = useState({});
  useEffect(() => {
    let filtereTake = take;

    Object.keys(filters).forEach((filter) => {
        if (filters[filter]) {
          switch (filter) {
            case "שם מנוי": {
              const filteredUsers = users?.find(user => user.userName === filters[filter])?.userCode;
              filtereTake = filtereTake.filter(row => 
                  typeof row["UserCode"] === "string" && row["UserCode"] === filteredUsers
              );
              break;
          }
          case "שם המשחק": {
              const filteredGame = games?.filter(game => game.GameName === filters[filter]);
              const gameCodesAsStrings = filteredGame?.map(game => game?.Id?.toString());
              filtereTake = filtereTake.filter(game => 
                  gameCodesAsStrings.includes(game.GameCode)
              );
              break;
          }
          default:
              break;
      }
        }
    });

    setTableArr(filtereTake);
  }, [take, filters]);
 
  const handleFilterChange = (filterName, chosenUser) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: chosenUser,
    }));
  };
  return (
    <div className="takes-abs">
      <div className="take-title">
        <div className="take-logo"></div>
        <div className="titleTake">השאלות</div>
        <div className="search-buttons">
          <SearchButtons 
          name="שם מנוי" 
          list={take} 
          onFilterChange={handleFilterChange}
          />
          <SearchButtons
            name="שם המשחק"
            list={take}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="table-title">
        <div className="taket-h3">פרטי המשחק</div>
        <div className="taket-h3">בהשאלה אצל</div>
        <div className="taket-h3">תאריך השאלה</div>
        <div className="taket-h3">תאריך החזרה</div>
      </div>
      <div className="take-table">
        <section className="section">
          {Array.isArray(tableArr) &&
            tableArr.map((item, i) => {
              const currentUser = users.find(
                (user) => user.userCode === item.UserCode
              );
              const currentGame = games.find(
                (game) => game.Id === item.GameCode
              );
              const returnDate = formatDate(item.ReturnDate);
              const delayMessage = calculateDaysBetween(
                returnDate,
                formattedDate
              );
              return (
                <div className="one-item" key={i}>
                  <div className="t-details">
                    {currentGame ? currentGame.GameName : "Game not found"}
                  </div>
                  <div className="found-at">
                    {currentUser ? currentUser.userName : "Game not found"}
                  </div>
                  <div className="take-date">
                    {item?.TakingDate ? formatDate(item.TakingDate) : ""}
                  </div>
                  <div className="makav">-</div>
                  <div className="back-date">
                    {item?.ReturnDate ? formatDate(item.ReturnDate) : ""}
                  </div>
                  {delayMessage > 30 ? (
                    <div className="delay">
                      <div className="delay-icon"> </div>
                      <div className="delay-message2">איחור מעל חודש</div>{" "}
                    </div>
                  ) : delayMessage >= 1 && delayMessage < 30 ? (
                    <div className="delay">
                      <div className="delay-icon"> </div>
                      <div className="delay-message">איחור</div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })}
        </section>
      </div>
    </div>
  );
};
