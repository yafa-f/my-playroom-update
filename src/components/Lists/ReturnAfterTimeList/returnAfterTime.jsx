import React, { useState } from "react";
import "./returnAfterTime.css";
import { useSelector } from "react-redux";
import WarningIcon from "@mui/icons-material/Warning";
import { generatePDF } from "../../exporttopdf/exportToPDF";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
export const ReturnAfterTimeList = () => {
  const takes = useSelector(
    (state) => state.takingOrReturning.takingsOrReturnings
  );
  const [takeAfterTimePDF, setTakeAfterTimePDF] = useState([
    { user: "",game: "",  delay: "" },
  ]);
  const users = useSelector((state) => state.user.users).data;

  const games = useSelector((state) => state.game.games);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsMenuOpen(false);
  };

  const handleClearSelection = () => {
    setSelectedUser(null);
  };

  const filteredTakes = selectedUser
    ? takes.filter((item) => {
        const user = users.find((u) => u.userCode === item.UserCode);
        return user?.userName === selectedUser;
      })
    : takes;

  const calculateDateDifference = (takingDate, returnDate) => {
    const diffTime = Math.abs(new Date(returnDate) - new Date(takingDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const weeks = Math.floor((diffDays % 30) / 7);
    const days = diffDays % 7;
    let result = [];
    if (years)
      result.push(
        years === 1 ? "שנה" : years === 2 ? "שנתיים" : `${years} שנים`
      );
    if (months)
      result.push(
        months === 1 ? "חודש" : months === 2 ? "חודשיים" : `${months} חודשים`
      );
    if (weeks)
      result.push(
        weeks === 1 ? "שבוע" : weeks === 2 ? "שבועיים" : `${weeks} שבועות`
      );
    if (days)
      result.push(days === 1 ? "יום" : days === 2 ? "יומיים" : `${days} ימים`);

    return result.length ? result.join(" ו") : "0 ימים";
  };
  const exportToPDF = () => {
    const columns = ["שם מנוי", "שם משחק","משך זמן האיחור", ];
    const title = "החזרות לאחר זמן";
   const rows= takes.filter((item) => !item.hasOwnProperty("ActualReturnDate"))
                .map((item, i) => {
                  const user = users.find(
                    (u) => u.userCode === item.UserCode
                  )?.userName;
                  const game = games.find(
                    (g) => g.Id === item.GameCode
                  )?.GameName;
                  const delay = calculateDateDifference(
                    item.TakingDate,
                    item.ReturnDate
                  );
                return{
                  user: user,
                  game: game,
                  delay: delay,
                }})
    generatePDF(columns, rows, title);
  };

  return (
    <div className="takes-and-title">
      <div className="search-container"></div>
      <div className="search-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {selectedUser || "שם מנוי"}
        <span className={`arrow ${isMenuOpen ? 'up' : 'down'}`}></span>
      </div>
      {selectedUser && (
        <button className="clear-selection" onClick={handleClearSelection}>
          ❌
        </button>
      )}
      {isMenuOpen && (
        <div className="user-menu">
          {users.map((user) => (
            <div
              key={user.userCode}
              onClick={() => handleUserSelect(user.userName)}
            >
              {user.userName}
            </div>
          ))}
        </div>
      )}

      <div className="title-icon-caption">
        <WarningIcon color="error" className="warning-logo" />
        <div className="titleReturns">החזרות לאחר הזמן</div>
      </div>
      <div className="takes">
        <div className="ret-title">
          <div className="h-3-ret">שם מנוי</div>
          <div className="h-3-ret">שם משחק</div>
          <div className="h-3-ret">משך זמן האיחור</div>
          <div className="tat-pdf-icon" onClick={() => exportToPDF()}>
            <PictureAsPdfIcon sx={{ color: "rgba(6, 120, 252, 1)" }} />
          </div>
        </div>
        <div className="retuen-after-time-table">
          <section className="section">
            {Array.isArray(filteredTakes) &&
              filteredTakes
                .filter((item) => !item.hasOwnProperty("ActualReturnDate"))
                .map((item, i) => {
                  const user = users.find(
                    (u) => u.userCode === item.UserCode
                  )?.userName;
                  const game = games.find(
                    (g) => g.Id === item.GameCode
                  )?.GameName;
                  const delay = calculateDateDifference(
                    item.TakingDate,
                    item.ReturnDate
                  );
                  {/* let obj={
                    user: user,
                    game: game,
                    delay: delay,
                  } */}
                  {/* setTakeAfterTimePDF(...takeAfterTimePDF,obj); */}

                  return (
                    delay !== "0 ימים" && (
                      <div className="one-item-return" key={index}>
                        <div className="return-user-name">{user}</div>
                        <div className="return-game-name">{game}</div>
                        <div className="duration-of-delay">{delay}</div>
                      </div>
                    )
                  );
                })}
          </section>
        </div>
      </div>
    </div>
  );
};

