import React, { useEffect, useState } from "react";
import "./Taking_Returning.css";
import { UserTitle } from "../UserScreen/userTitle";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import UpdateTOR from "../UpdateFunction/UpdateTOR";
import UpdateGameTOR from "../UpdateFunction/UpdateGameTOR";
import { UPDATE_GAME } from "../../app/slices/gameSlice";
import { UPDATE_TOR } from "../../app/slices/takeOrReturnSlice";
import UpdateGameWithMissPart from "../UpdateFunction/UpdateGameWithMissPart";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { generatePDF } from "../exporttopdf/exportToPDF";
import {
  ADD_GAMES_WITH_MISSING_PARTS,
  UPDATE_GAMES_WITH_MISSING_PARTS,
} from "../../app/slices/gamesWiteMissingPartsSlice";
import NewGameWithMissPartFunction from "../AddFunctions/NewGameWithMissPartFunction";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import NewDebtFunction from "../AddFunctions/NewDebtFunction";
import { ADD_DEBT } from "../../app/slices/debtSlice";

export const Taking_Returning = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState("אישור");
  const [circleFlag, setCircleFlag] = useState(false);
  const [status, setStatus] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [cancelReturn, setCancelReturn] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [fineIchur, setFineIchur] = useState({});
  const [finePart, setFinePart] = useState({});
  const [weekNum, setWeekNum] = useState({});
  const [finesSum, setFinesSum] = useState({});
  const [returnStatus, setReturnStatus] = useState({});
  const [amountOfPartAfterReturn, setAmountOfPartAfterReturn] = useState({});
  const [tableDataPart, setTableDataPart] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");
  const [selectedValue, setSelectedValue] = useState({});
  const [newFilteredList, setNewFilteredList] = useState([]);
  const [lastGameWithMiss, setLastGameWithMiss] = useState({});
  const [totalFine,setTotalFine] = useState();

  useEffect(() => {
    console.log("datatable", dataTable);
    let tot = dataTable.reduce((acc, item) => acc + item.fine, 0);
    console.log("tot", tot);
    setTotalFine(tot);
  }, [dataTable]);
  const singleUser = useSelector((state) => state.singleUser.singleUser);
  const take = useSelector(
    (state) => state.takingOrReturning.takingsOrReturnings
  );
  const games = useSelector((state) => state.game.games);
  const forAgesFromStore = useSelector((state) => state.forAge.forAges).data;
  const typesGamesFromStore = useSelector((state) => state.typeGame.typesGames);
  const gamesWithMissing = useSelector(
    (state) => state.gamesWithMissingPart.gamesWithMissingParts
  ).data;

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    if (totalFine > 0) setOpen(true);
    else ApprovalReturnGames();
  };
  const handleClosePaid = () => {
    setOpen(false);
    ApprovalReturnGames();
  };
  const handleCloseDebt = async () => {
    let debtObj = {
      userCode: singleUser.userCode,
      userName: singleUser.userName,
      debt: totalFine,
      date: new Date().toISOString().split("T")[0],
    };
    const addResponse = await NewDebtFunction(debtObj);
    if (addResponse) {
      dispatch(ADD_DEBT(addResponse));
      setOpen(false);
      ApprovalReturnGames();
    }
  };
  useEffect(() => {
    const filteredItems = take.filter(
      (item) =>
        item.UserCode === singleUser.userCode &&
        item.ActualReturnDate === undefined &&
        games.some(
          (game) => game.Id === item.GameCode && game.IsAvailable === "FALSE"
        )
    );
    setNewFilteredList(filteredItems);
  }, [games, take, singleUser.userCode]);

  const addTake = () => {
    navigate("/addTake");
  };

  const handleChangeSelectedValue = (ReturnID, value) => {
    setSelectedValue((prevValues) => ({
      ...prevValues,
      [ReturnID]: value,
    }));
    if (value === "חסרים חלקים") {
      const takeC = take.find((t) => t.ReturnID === ReturnID).GameCode;
      const missingGame = gamesWithMissing.find((g) => g.Id === takeC);
      if (missingGame) {
        setLastGameWithMiss((prevGame) => ({
          ...prevGame,
          [ReturnID]: missingGame.MissingParts,
        }));
      }
    }
  };

  const handleInputChange = (ReturnID, partIndex, value) => {
    setAmountOfPartAfterReturn((prev) => ({
      ...prev,
      [ReturnID]: {
        ...prev[ReturnID],
        [partIndex]: value,
      },
    }));
  };
  const addAmountOfPartAfterReturn = (part) => {
    setTableDataPart((prevData) => [...prevData, part]);
  };

  const handleSaveData = (ReturnID, gamecode) => {
    setCancelReturn((prevCancl) => ({
      ...prevCancl,
      [ReturnID]: true,
    }));

    const currentDate = new Date().toISOString().split("T")[0];
    const tableObject = {
      headers: ["שם החלק", "מס’ חלקים מקורי", "מס’ חלקים לאחר החזרה"],
      rows: tableDataPart,
    };

    let newEntry = {
      ReturnID,
      GameCode: gamecode,
      date: currentDate,
      status: selectedValue[ReturnID],
      fine: finesSum[ReturnID] || 0,
    };

    if (selectedValue[ReturnID] === "חסרים חלקים") {
      newEntry.table = tableObject;
    }

    setDataTable((prevData) => [...prevData, newEntry]);
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [ReturnID]: !prevExpanded[ReturnID],
    }));
  };

  const handleReturnToggle = (ReturnID) => {
    if (cancelReturn[ReturnID]) {
      setDataTable((prevData) =>
        prevData.filter((item) => item.ReturnID !== ReturnID)
      );
      setReturnStatus((prevStatus) => ({
        ...prevStatus,
        [ReturnID]: !prevStatus[ReturnID],
      }));
      setCancelReturn((prevCancl) => ({
        ...prevCancl,
        [ReturnID]: false,
      }));
    } else {
      setExpanded((prevExpanded) => ({
        ...prevExpanded,
        [ReturnID]: !prevExpanded[ReturnID],
      }));
      setReturnStatus((prevStatus) => ({
        ...prevStatus,
        [ReturnID]: !prevStatus[ReturnID],
      }));
    }
  };

  const ApprovalReturnGames = async () => {
    setCircleFlag(true);
    setButtonText("החזרת המשחקים בתהליך...");

    const results = await Promise.all(
      dataTable.map(async (t) => {
        if (t.status === "חסרים חלקים") {
          let g = games.find((g) => g.Id === t.GameCode);
          let missPart = gamesWithMissing?.find(
            (game) => game.Id === t.GameCode
          );
          let gameWithMiss = {
            Id: g.Id,
            GameName: g.GameName,
            MissingParts: t.table,
          };

          if (missPart) {
            const updateGameMiss = await UpdateGameWithMissPart(gameWithMiss);
            if (updateGameMiss) {
              dispatch(UPDATE_GAMES_WITH_MISSING_PARTS(gameWithMiss));
            } else {
              console.error("Failed to update object");
            }
          } else {
            const addGameMiss = await NewGameWithMissPartFunction(gameWithMiss);
            if (addGameMiss) {
              dispatch(ADD_GAMES_WITH_MISSING_PARTS(gameWithMiss));
            } else {
              console.error("Failed to add object");
            }
          }
        }

        let take = {
          IsMissingParts: t.status === "תקין" ? false : true,
          ActualReturnDate: t.date,
          ReturnID: t.ReturnID,
        };

        if (t.fine) {
          take.Fine = t.fine;
        }

        const updateTOR = await UpdateTOR(take);
        if (updateTOR) {
          let code = games.find((g) => g.Id === t.GameCode).Id;
          let game = {
            Id: code,
            CurrentStateOfGame: t.status,
            IsAvailable: "TRUE",
          };
          const updateGameTor = await UpdateGameTOR(game);
          if (updateGameTor) {
            dispatch(UPDATE_GAME(updateGameTor));
          } else {
            console.error("Failed to add object");
          }
          dispatch(UPDATE_TOR(updateTOR));
          return { code: t.GameCode, success: true };
        } else {
          return { code: t.GameCode, success: false };
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
      setButtonText("כל המשחקים הוחזרו בהצלחה!");
      setTimeout(() => {
        navigate("/singleUser");
      }, 3000);
    }

    setDataTable([]);
    setSelectedValue({});
  };

  const handleBlurFine = (item) => {
    let a = Number(fineIchur[item]) * Number(weekNum[item]);
    let b = Number(finePart[item]) + a;
    if (b > 0)
      setFinesSum((prevFineSum) => ({
        ...prevFineSum,
        [item]: b,
      }));
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

  const popover = () => {
    setIsVisible(!isVisible);
  };

  const exportToPDF = () => {
    const columns = [
      "שם משחק",
      "סטטוס המשחק",

      "תאריך השאלה",
      "תאריך מיועד להחזרה",
    ];
    const rows = newFilteredList.map((item) => {
      let g = games.find((g) => g.Id === item.GameCode)?.GameName;
      return {
        name: g,
        status: item.IsMissingParts ? "חסרים חלקים" : "תקין",
        takingDate: formatDate(item.TakingDate),
        returnDate: formatDate(item.ReturnDate),
      };
    });
    const title = `משחקים מושאלים אצל ${singleUser.userName}`;
    generatePDF(columns, rows, title);
  };
  console.log("newFilteredList", newFilteredList);
  return (
    <div className="single-user">
      <UserTitle
        name={singleUser.userName}
        phone={singleUser.phone}
        cellphone={singleUser.cellphone}
        email={singleUser.email}
      />
     
      <div className="single-user-take-title">
        <div className="single-user-take-logo"></div>
        <div className="single-user-titleTake">משחקים בהשאלה</div>
        <div className="btn-hashala" onClick={addTake}>
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
        <div className="pdf-icon-tor" onClick={() => exportToPDF()}>
          <PictureAsPdfIcon sx={{ color: "rgba(6, 120, 252, 1)" }} />
        </div>
      </div>
      <div className="single-user-table">
        {newFilteredList.map((item, i) => {
          const game = games.find((game) => game.Id === item.GameCode);
          const age = forAgesFromStore.find(
            (a) => a.AgeCode === game.AgeCode
          )?.Age;
          const tchum = typesGamesFromStore.find(

            (t) => t.gameTypeCode === game.GameTypeCode
          )?.gameTipeName;
          const returnDate = formatDate(item.ReturnDate);
          const delayMessage = calculateDaysBetween(returnDate, formattedDate);
          
          return (
            <div key={i} style={{ marginBottom: "10px" }}>
              <Accordion
                expanded={!!expanded[item.ReturnID]}
               
                sx={[
                  {
                    ...(expanded[item.ReturnID]
                      ? {
                          "& .MuiAccordion-region": {
                            height: "auto",
                          },
                          "& .MuiAccordionDetails-root": {
                            display: "block",
                          },
                        }
                      : {
                          "& .MuiAccordion-region": {
                            height: 0,
                          },
                          "& .MuiAccordionDetails-root": {
                            display: "none",
                          },
                        }),
                    direction: "rtl",
                  },
                ]}
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
                          {age}
                        </div>
                        <div className="pas-SU">|</div>
                        <div className="type-SU">
                          <div className="tchum-SU">תחום:</div>
                          <div>{tchum}</div>
                        </div>
                      </div>
                    </div>
                    <div className="status-SU">
                      <div
                        className={`SU-CurrentStateOfGame ${
                          game.CurrentStateOfGame === "תקין" ||
                          game.CurrentStateOfGame === ""
                            ? "green"
                            : game.CurrentStateOfGame === "חסרים חלקים"
                            ? "red"
                            : ""
                        }`}
                      ></div>
                      <div>{game.CurrentStateOfGame || "תקין"}</div>
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
                    ) : delayMessage >= 1 && delayMessage < 30 ? (
                      <div className="delay-SU">
                        <div className="delay-icon-SU"> </div>
                        <div className="delay-message-SU">איחור</div>
                      </div>
                    ) : (
                      <div className="delay-SU"></div>
                    )}
                    <button
                      className={`return-btn ${
                        returnStatus[item.ReturnID] ? "cancel" : ""                    
                      }`}
                      onClick={() => handleReturnToggle(item.ReturnID)}
                    >
                      <div
                        className={`return-btn-text ${
                          returnStatus[item.ReturnID] ? "cancel" : ""
                         
                        }`}
                      >
                        <ExpandMoreIcon
                          sx={{
                            color: returnStatus[item.ReturnID]
                              ? "rgba(255, 255, 255, 1)"
                              : "rgba(6, 120, 252, 1)",
                          }}
                        />
                        <div style={{ marginTop: "5px" }}>

                          {returnStatus[item.ReturnID]
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
                      <div className="status-in-return">מצב המשחק בהחזרה:</div>
                      <div key={item.ReturnID}>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                          value={selectedValue[item.ReturnID] || ""}
                          onChange={(e) =>
                            handleChangeSelectedValue(
                              item.ReturnID,
                              e.target.value
                            )
                          }
                        >
                          <div style={{ display: "inline-flex" }}>
                            <FormControlLabel
                              value="תקין"
                              control={
                                <Radio sx={{ color: "rgba(26, 94, 169, 1)" }} />
                              }
                              label="תקין"
                            />
                            <FormControlLabel
                              value="חסרים חלקים"
                              control={
                                <Radio sx={{ color: "rgba(26, 94, 169, 1)" }} />
                              }
                              label="חסרים חלקים"
                            />
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  {selectedValue[item.ReturnID] === "חסרים חלקים" && (
                    <>

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
                              borderBottom: "1px rgba(6, 120, 252, 0.5) solid",
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
                        <tbody style={{ width: "37vw" }}>

                          {game.Parts.map((part, p, i) => (

                            <tr
                              key={p}
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


                                  key={item.ReturnID}
                                  value={
                                    amountOfPartAfterReturn[item.ReturnID]?.[
                                      p
                                    ] ||

                                    "" ||
                                    lastGameWithMiss[item.ReturnID]?.[0]?.rows[
                                      p
                                    ]?.afterReturn
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      item.ReturnID,
                                      p,
                                      e.target.value
                                    )
                                  }
                                  onBlur={() =>
                                    addAmountOfPartAfterReturn({
                                      ...part,
                                      afterReturn:
                                        amountOfPartAfterReturn[
                                          item.ReturnID
                                        ]?.[p] || "",
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


                    </>
                  )}
                  {(delayMessage >= 1 ||
                    selectedValue[item.ReturnID] === "חסרים חלקים") && (
                    <>
                      <div
                        className="heart-container"
                        style={{
                          visibility: isVisible ? "visible" : "hidden",
                          marginTop: "5vh",
                          marginBottom: "5vh",
                          marginRight: "12vw",
                        }}
                      >

                        <div className="heart">מס' שבועות</div>
                      </div>
                      <div className="calculate-inputs">
                        <input
                          placeholder="קנס עבור איחור בודד"
                          value={fineIchur[item.ReturnID]}
                          onChange={(e) =>
                            setFineIchur((prevFineIchur) => ({
                              ...prevFineIchur,
                              [item.ReturnID]: e.target.value,
                            }))
                          }

                          style={{
                            textAlign: "center",
                            width: "10vw",
                            height: "4vh",
                            borderRadius: "28px",
                          }}

                        ></input>
                        x
                        <input
                          value={weekNum[item.ReturnID]}
                          onChange={(e) =>
                            setWeekNum((prevWeekNum) => ({
                              ...prevWeekNum,
                              [item.ReturnID]: e.target.value,
                            }))
                          }
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
                          value={finePart[item.ReturnID]}
                          onChange={(e) =>
                            setFinePart((prevFinePart) => ({
                              ...prevFinePart,
                              [item.ReturnID]: e.target.value,
                            }))
                          }
                          style={{
                            textAlign: "center",
                            width: "10vw",
                            height: "4vh",
                            borderRadius: "28px",
                            marginLeft: "30px",
                          }}
                         
                          onBlur={() => handleBlurFine(item.ReturnID)}
                        ></input>
                        סה”כ קנס:
                        <input
                          value={finesSum[item.ReturnID]}
                          onChange={(e) =>
                            setFinesSum((prevFineSum) => ({
                              ...prevFineSum,
                              [item.ReturnID]: e.target.value,
                            }))
                          }
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
                    onClick={() => handleSaveData(item.ReturnID, item.GameCode)}
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      backgroundColor: "rgba(6, 120, 252, 1)",
                      width: "7vw",
                      height: "4vh",
                      marginRight: "65vw",
                      borderRadius: "28px",
                      borderColor: "rgba(6, 120, 252, 1)",
                    }}
                  >
                    שמירת נתונים
                  </button>
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      </div>
      {newFilteredList.length > 0 && (
        <div className="Approval">
          סה"כ קנסות:
          <input
            type="text"
            className="Approval-input"
            value={`${totalFine} ש"ח`}
            disabled
          />
          <React.Fragment>
            {/* //onClick={ApprovalReturnGames} */}
            <button onClick={handleClickOpen} className="Approval-btn">
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
            <Dialog
              open={open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" sx={{ direction: "rtl" }}>
                {"האם שולם הקנס בעת ההחזרה?"}
              </DialogTitle>
              <DialogActions sx={{ direction: "rtl" }}>
                <Button onClick={handleClosePaid}>שולם</Button>
                <Button onClick={handleCloseDebt}>לרשום כחוב</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </div>
      )}
    </div>
  );
};
