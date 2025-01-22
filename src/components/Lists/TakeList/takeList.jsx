import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SearchButtons } from "../GamesList/SearchButtons";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { generatePDF } from "../../exporttopdf/exportToPDF";
import "./takeList.css";

export const TakeList = () => {
  const games = useSelector((state) => state.game.games);
  const users = useSelector((state) => state.user.users)?.data || [];
  const take = useSelector((state) => state.takingOrReturning.takingsOrReturnings);
  
  const [tableArr, setTableArr] = useState([]);
  const [filters, setFilters] = useState({});
  
  useEffect(() => {
    const filteredTake = take.filter((item) => item.ActualReturnDate === undefined);
    setTableArr(filteredTake);
  }, [take]);

  useEffect(() => {
    let filteredTake = take;

    Object.keys(filters).forEach((filter) => {
      if (filters[filter]) {
        switch (filter) {
          case "שם מנוי": {
            const filteredUser = users.find((user) => user.userName === filters[filter])?.userCode;
            filteredTake = filteredTake.filter((row) => row.UserCode === filteredUser);
            break;
          }
          case "שם המשחק": {
            const filteredGames = games.filter((game) => game.GameName === filters[filter]);
            const gameCodes = filteredGames.map((game) => game.Id.toString());
            filteredTake = filteredTake.filter((item) => gameCodes.includes(item.GameCode));
            break;
          }
          default:
            break;
        }
      }
    });

    setTableArr(filteredTake);
  }, [take, filters, games, users]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const calculateDaysBetween = (returnDateStr, currentDateStr) => {
    const [day1, month1, year1] = returnDateStr.split("/").map(Number);
    const [day2, month2, year2] = currentDateStr.split("/").map(Number);
    const returnDate = new Date(year1, month1 - 1, day1);
    const currentDate = new Date(year2, month2 - 1, day2);
    return Math.ceil((currentDate - returnDate) / (1000 * 3600 * 24));
  };

  const exportToPDF = () => {
    const columns = ["שם משחק", "בהשאלה אצל", "תאריך השאלה", "תאריך החזרה"];
    const title = "משחקים בהשאלה";
    const rows = tableArr.map((item) => {
      const gameName = games.find((g) => g.Id === item.GameCode)?.GameName || "משחק לא נמצא";
      const userName = users.find((u) => u.userCode === item.UserCode)?.userName || "משתמש לא נמצא";
      return {
        gameName,
        userName,
        TakingDate: formatDate(item.TakingDate),
        ReturnDate: formatDate(item.ReturnDate),
      };
    });
    generatePDF(columns, rows, title);
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");

  const handleFilterChange = (filterName, chosenUser) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: chosenUser,
    }));
  };

  return (
    <div className="takes-abs">
      <div className="take-title">
        <div className="take-logo" />
        <div className="titleTake">השאלות</div>
        <div className="search-buttons">
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
        <div className="pdf-icon-takeList" onClick={exportToPDF}>
          <PictureAsPdfIcon sx={{ color: "rgba(6, 120, 252, 1)" }} />
        </div>
      </div>
      <div className="take-table">
        <section className="section">
          {Array.isArray(tableArr) &&
            tableArr.map((item, index) => {
              const currentUser = users.find((user) => user.userCode === item.UserCode);
              const currentGame = games.find((game) => game.Id === item.GameCode);
              const returnDate = formatDate(item.ReturnDate);
              const delayMessage = calculateDaysBetween(returnDate, formattedDate);
              return (
                <div className="one-item" key={index}>
                  <div className="t-details">
                    {currentGame ? currentGame.GameName : "משחק לא נמצא"}
                  </div>
                  <div className="found-at">
                    {currentUser ? currentUser.userName : "משתמש לא נמצא"}
                  </div>
                  <div className="take-date">
                    {item.TakingDate ? formatDate(item.TakingDate) : ""}
                  </div>
                  <div className="makav">-</div>
                  <div className="back-date">
                    {item.ReturnDate ? formatDate(item.ReturnDate) : ""}
                  </div>
                  {delayMessage > 30 ? (
                    <div className="delay">
                      <div className="delay-icon" />
                      <div className="delay-message2">איחור מעל חודש</div>
                    </div>
                  ) : delayMessage >= 1 ? (
                    <div className="delay">
                      <div className="delay-icon" />
                      <div className="delay-message">איחור</div>
                    </div>
                  ) : null}
                </div>
              );
            })}
        </section>
      </div>
    </div>
  );
};
