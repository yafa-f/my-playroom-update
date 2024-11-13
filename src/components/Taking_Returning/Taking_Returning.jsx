import React, { useEffect } from "react";
import "./Taking_Returning.css";
import { useLocation, useNavigate } from "react-router-dom";
import { UserTitle } from "../UserScreen/userTitle";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { AccordionDetails, AccordionSummary, Accordion } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export const Taking_Returning = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [fineIchur, setFineIchur] = useState();
  const [finePart, setFinePart] = useState();
  const [weekNum, setWeekNum] = useState();
  const [finesSum, setFinesSum] = useState();
  const [returnStatus, setReturnStatus] = useState({});
  const [amountOfPartAfterReturn, setAmountOfPartAfterReturn] = useState();
  const [tableData, setTableData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");
  const [selectedValue, setSelectedValue] = useState({});
  const singleUser = useSelector((state) => state.singleUser.singleUser);
  const take = useSelector((state) => state.takingOrReturning.takingsOrReturnings);
  const games = useSelector((state) => state.game.games);
  const unavailableGameCodes = games
    .filter((game) => game.IsAvailable == "FALSE")
    .map((game) => game.Id);
  const newFilteredList = take.filter(
    (item) =>
      item.UserCode === singleUser.userCode &&
      unavailableGameCodes.includes(item.GameCode)
  );
  const handleChangeSelectedValue = (gameCode, value) => {
    setSelectedValue((prevValues) => ({
      ...prevValues,
      [gameCode]: value,
    }));
  };
  const addAmountOfPartAfterReturn = (part) => {
    setTableData((prevData) => [...prevData, part]);
  };

  const handleSaveData = (gameCode) => {
    const currentDate = new Date().toISOString().split("T")[0]; 
    const tableObject = {
      headers: ["שם החלק", "מס’ חלקים מקורי", "מס’ חלקים לאחר החזרה"],
      rows: tableData,
    };
    let newEntry = {
      GameCode: gameCode,
      date: currentDate,
      status: selectedValue,
    };

    if (selectedValue === "חסרים חלקים") {
      newEntry.fine = finesSum; 
      newEntry.table = tableObject; 
    }
    setDataTable((prevData) => [...prevData, newEntry]);
  };

  const handleReturnToggle = (gameCode) => {
    setReturnStatus((prevStatus) => ({
      ...prevStatus,
      [gameCode]: !prevStatus[gameCode],
    }));
  };

  const handleBlurFine = () => {
    let a = Number(fineIchur) * Number(weekNum);
    let b = Number(finePart) + a;
    setFinesSum(b);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
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

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const popover = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="single-user">
      <UserTitle
        name={singleUser.userName}
        phone={singleUser.phone}
        cellphone={singleUser.cellphone}
      ></UserTitle>
      <div className="single-user-take-title">
        <div className="single-user-take-logo"></div>
        <div className="single-user-titleTake">משחקים בהשאלה</div>
        <div className="btn-hashala">
          <Button
            sx={{
              width: "150px",
              height: "38px",
              borderRadius: "28px",
            }}
            variant="contained"
          >
            השאלה +
          </Button>
        </div>
      </div>

      <div className="single-table-title">
        <div className="single-taket-h3">פרטי המשחק</div>
        <div className="single-taket-h3">סטטוס</div>
        <div className="single-taket-h3">תאריך השאלה</div>
        <div className="single-taket-h3">תאריך החזרה</div>
      </div>
      <div className="single-user-table">
        <section className="single-section">
          {newFilteredList.map((item, i) => {
            let game = games.find((game) => game.Id === item.GameCode);
            const returnDate = formatDate(item.ReturnDate);
            const delayMessage = calculateDaysBetween(
              returnDate,
              formattedDate
            );
            return (
              <div key={i} style={{ marginBottom: "10px" }}>
                <Accordion
                  sx={{
                    direction: "rtl",
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <div className="one-item-SU" key={i}>
                      <div className="game-details-SU">
                        <div className="game-names-SU">{game.GameName}</div>
                        <div className="game-names-second-SU">
                          <div className="age-SU">
                            <div className="child-logo-SU"></div>
                            {game.AgeCode}
                          </div>
                          <div className="pas-SU">|</div>
                          <div className="type-SU">
                            <div className="tchum-SU">תחום:</div>
                            <div>{game.GameTypeCode}</div>
                          </div>
                        </div>
                      </div>
                      <div className="status-SU">
                        <div
                          className={`SU-CurrentStateOfGame ${
                            game.CurrentStateOfGame == "תקין"
                              ? "green"
                              : game.CurrentStateOfGame == "חסרים חלקים"
                              ? "red"
                              : ""
                          }`}
                        ></div>
                        <div>{game.CurrentStateOfGame}</div>
                      </div>
                      <div className="date-SU">
                        <div className="take-date-SU">
                          {item?.TakingDate ? formatDate(item.TakingDate) : ""}
                        </div>
                        <div className="makav-SU">-</div>
                        <div className="back-date-SU">
                          {item?.ReturnDate ? formatDate(item.ReturnDate) : ""}
                        </div>
                      </div>
                      {delayMessage > 30 ? (
                        <div className="delay-SU">
                          <div className="delay-icon-SU"> </div>
                          <div className="delay-message2-SU">
                            איחור מעל חודש
                          </div>{" "}
                        </div>
                      ) : delayMessage >= 1 && delayMessage > 30 ? (
                        <div className="delay-SU">
                          <div className="delay-icon-SU"> </div>
                          <div className="delay-message-SU">איחור</div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <button
                        key={i}
                        className="return-btn"
                        onClick={() => handleReturnToggle(item.GameCode)}
                      >
                        <div className="return-btn-text">
                          <ExpandMoreIcon
                            sx={{ color: "rgba(6, 120, 252, 1)" }}
                          />
                          <div style={{ marginTop: "5px" }}>
                            {" "}
                            {returnStatus[item.GameCode]
                              ? "ביטול החזרה"
                              : "החזרה"}
                          </div>
                        </div>
                      </button>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="return-details">
                      <div className="return-details-title">פרטי החזרה</div>
                      <div className="return-details-status">
                        <div className="status-in-return">
                          מצב המשחק בהחזרה:
                        </div>
                        <div key={item.GameCode}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={selectedValue[item.GameCode] || ""}
                            onChange={(e)=>handleChangeSelectedValue(item.GameCode, e.target.value)}
                          >
                            <div style={{ display: "inline-flex" }}>
                              <FormControlLabel
                                value="תקין"
                                control={
                                  <Radio
                                    sx={{ color: "rgba(26, 94, 169, 1)" }}
                                  />
                                }
                                label="תקין"
                              />
                              <FormControlLabel
                                value="חסרים חלקים"
                                control={
                                  <Radio
                                    sx={{ color: "rgba(26, 94, 169, 1)" }}
                                  />
                                }
                                label="חסרים חלקים"
                              />
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>

                    {selectedValue[item.GameCode] === "חסרים חלקים" && (
                      <>
                        {" "}
                        <table
                          style={{
                            width: "35vw",
                            backgroundColor: "rgba(248, 248, 248, 1)",
                            marginTop: "10px",
                          }}
                        >
                          <thead>
                            <tr
                              style={{
                                textAlign: "center",
                                fontSize: "16px",
                                fontWeight: 700,
                                lineHeight: "21.79px",
                                borderBottom:
                                  "1px rgba(6, 120, 252, 0.5) solid",
                                color: "rgba(104, 100, 100, 1)",
                                marginRight: "10px",
                              }}
                            >
                              <th>שם החלק</th>
                              <th style={{ marginRight: "10px" }}>
                                מס’ חלקים מקורי
                              </th>
                              <th style={{ marginRight: "100px" }}>
                                מס’ חלקים לאחר החזרה
                              </th>
                            </tr>
                          </thead>
                          <tbody
                            style={{ width: "37vw" }}
                          >
                            {game.Parts.map((part, p) => (
                              <tr
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "400",
                                  lineHeight: "24px",
                                  textAlign: "center",
                                  color: "rgba(104, 100, 100, 1)",
                                  gridTemplateColumns: "5vw 5vw 5vw",
                                }}
                              >
                                <td>{part.name}</td>
                                <td>{part.amount}</td>
                                <td>
                                  <input
                                    key={p}
                                    onChange={(e) =>
                                      setAmountOfPartAfterReturn(e.target.value)
                                    }
                                    onBlur={() =>
                                      addAmountOfPartAfterReturn({
                                        ...part,
                                        afterReturn: amountOfPartAfterReturn,
                                      })
                                    }
                                    style={{
                                      borderRadius: "28px",
                                      border: "1px rgba(35, 31, 32, 0.4) solid",
                                      width: "2vw",
                                      height: "3vh",
                                    }}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div
                          className="heart-container"
                          style={{
                            visibility: isVisible ? "visible" : "hidden",
                            marginTop: "5vh",
                            marginBottom: "5vh",
                            marginRight: "12vw",
                          }}
                        >
                          <div className="heart"></div>
                          <div className="content">מס’ שבועות</div>
                        </div>
                        <div className="calculate-inputs">
                          <input
                            placeholder="קנס עבור איחור בודד"
                            value={fineIchur}
                            onChange={(e) => setFineIchur(e.target.value)}
                            style={{
                              textAlign: "center",
                              width: "10vw",
                              height: "4vh",
                              borderRadius: "28px",
                            }}
                          ></input>
                          x
                          <input
                            value={weekNum}
                            onChange={(e) => setWeekNum(e.target.value)}
                            style={{
                              width: "2vw",
                              textAlign: "center",

                              height: "4vh",
                              borderRadius: "999px",
                            }}
                            onMouseOver={popover}
                            onMouseLeave={popover}
                          />
                          +
                          <input
                            placeholder="קנס עבור חלקים חסרים"
                            value={finePart}
                            onChange={(e) => setFinePart(e.target.value)}
                            style={{
                              textAlign: "center",
                              width: "10vw",
                              height: "4vh",
                              borderRadius: "28px",
                              marginLeft: "30px",
                            }}
                            onBlur={handleBlurFine}
                          ></input>
                          סה”כ קנס:
                          <input
                            value={finesSum}
                            onChange={(e) => setFinesSum(e.target.value)}
                            style={{
                              textAlign: "center",
                              width: "10vw",
                              height: "4vh",
                              borderRadius: "28px",
                              borderColor: "rgba(255, 255, 255, 1)",
                              backgroundColor: "rgba(184, 184, 184, 0.28)",
                            }}
                          />
                        </div>
                      </>
                    )}
                    <button
                      onClick={() => handleSaveData(item.GameCode)}
                      style={{
                        color: "rgba(255, 255, 255, 1)",
                        backgroundColor: "rgba(6, 120, 252, 1)",
                        width: "7vw",
                        height: "4vh",
                        marginRight: "65vw",
                        borderRadius: "28px",
                      }}
                    >
                      שמירת נתונים
                    </button>
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
