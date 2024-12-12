import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { ADD_GAME } from "../../../app/slices/gameSlice";
import { UPDATE_CLOSET } from "../../../app/slices/closetSlice";
import UpdateGame from "../../UpdateFunction/UpdateGame";
import { UPDATE_GAME } from "../../../app/slices/gameSlice";
import "./newGame.css";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NewGameFunction from "../../AddFunctions/NewGameFunction";
import UpdateCloset from "../../UpdateFunction/UpdateCloset";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export const NewGame = () => {
  const navigate = useNavigate();
  const { bool } = useParams();
  const location = useLocation();
  const { gameToUpdate } = location.state || {};
  const [codeOfCloset, setCodeOfCloset] = useState("");
  const [placeInCloset, setPlaceInCloset] = useState("");
  const [status, setStatus] = useState(null);
  const [circleFlag, setCircleFlag] = useState(false);
  const [flagEqualCode, setFlagEqualCode] = useState(false);
  const [buttonText, setButtonText] = useState("אישור");
  const dispatch = useDispatch();
  const forAges = useSelector((state) => state.forAge.forAges);
  const typesGames = useSelector((state) => state.typeGame.typesGames);
  const [localClosets, setLocalClosets] = useState(
    useSelector((state) => state.closet.closets)
  );
  const [updateLocation, setUpdateLocation] = useState([]);
  const [updateLocation2, setUpdateLocation2] = useState([]);
  const [localGames, setLocalGames] = useState(
    useSelector((state) => state.game.games)
  );
  const [formData, setFormData] = useState({
    Id: "",
    GameCode: "",
    ClosetNumber: "",
    PlaceInCloset: "",
    GameName: "",
    GameTypeCode: "",
    Parts: [{ name: "", amount: 0 }],
    AgeCode: "",
    CurrentStateOfGame: "",
    Location: "",
    PrintSticker: false,
    HaveComplementaryGame: "",
    IsAvailable: "",
    Comment: "",
  });
  useEffect(() => {
    if (bool === "true" && gameToUpdate) {
      let age = forAges.data.find(
        (a) => a.AgeCode === gameToUpdate.AgeCode
      )?.Age;
      let tchum = typesGames.find(
        (t) => t.gameTypeCode === gameToUpdate.GameTypeCode
      )?.gameTipeName;
      setFormData({
        Id: gameToUpdate.Id,
        GameCode: gameToUpdate.GameCode,
        ClosetNumber: gameToUpdate.ClosetNumber,
        PlaceInCloset: gameToUpdate.PlaceInCloset,
        GameName: gameToUpdate.GameName,
        GameTypeCode: tchum,
        Parts: gameToUpdate.Parts,
        AgeCode: age,
        CurrentStateOfGame: gameToUpdate.CurrentStateOfGame,
        Location: gameToUpdate.Location,
        PrintSticker: gameToUpdate.PrintSticker,
        HaveComplementaryGame: gameToUpdate.HaveComplementaryGame,
        IsAvailable: gameToUpdate.IsAvailable,
        Comment: gameToUpdate.Comment,
      });
      setCodeOfCloset(gameToUpdate.ClosetNumber);
      setPlaceInCloset(gameToUpdate.PlaceInCloset);
    } else {
      let randomNumberCode;
      const codes = localGames.map((game) => Number(game.GameCode));
      do {
        randomNumberCode = Math.floor(Math.random() * 10000) + 1;
      } while (codes.includes(randomNumberCode));
      let randomNumberId;
      const Ids = localGames.map((game) => Number(game.GameCode));
      do {
        randomNumberId = Math.floor(Math.random() * 10000) + 1;
      } while (Ids.includes(randomNumberId));

      setFormData({
        ...formData,
        Id: String(randomNumberId),
        GameCode: randomNumberCode,
      });
    }
  }, [bool, gameToUpdate]);
  useEffect(() => {}, [localGames]);
  useEffect(() => {}, [localClosets]);
  useEffect(() => {
    let selectedClosetArray =
      Array.isArray(localClosets) &&
      localClosets?.filter(
        (closet) => closet?.closetCode === formData.ClosetNumber
      )[0]?.emptyPlace;
    if (Array.isArray(selectedClosetArray)) {
      if (selectedClosetArray.length === 1) {
        let updatedNumbers = [Number(formData.PlaceInCloset) + 1];
        setUpdateLocation(updatedNumbers);
      } else if (
        Number(formData.PlaceInCloset) !== Math.max(...selectedClosetArray)
      ) {
        let updatedNumbers = selectedClosetArray.filter(
          (number) => number !== Number(formData.PlaceInCloset)
        );
        setUpdateLocation(updatedNumbers);
      } else if (
        Number(formData.PlaceInCloset) === Math.max(...selectedClosetArray)
      ) {
        let updatedNumbers = [
          ...selectedClosetArray.filter(
            (number) => number !== Number(formData.PlaceInCloset)
          ),
          Number(formData.PlaceInCloset) + 1,
        ];
        setUpdateLocation(updatedNumbers);
      }
    }
    if (bool === "true") {
      if (codeOfCloset !== formData.ClosetNumber) {
        let selectedClosetArray2 =
          (Array.isArray(localClosets) &&
            localClosets?.filter(
              (closet) => closet?.closetCode === codeOfCloset
            )[0]?.emptyPlace) ||
          [];
        let updateNumbers2 = [...selectedClosetArray2, Number(placeInCloset)];
        updateNumbers2.sort((a, b) => a - b);
        setUpdateLocation2(updateNumbers2);
        setFlagEqualCode(false);
      } else {
        setFlagEqualCode(true);
      }
    }
  }, [formData.PlaceInCloset]);
  const handleAddRow = () => {
    setFormData({
      ...formData,
      Parts: [...formData.Parts, { name: "", amount: 0 }],
    });
  };
  const handleDeleteRow = (index) => {
    const newRows = formData.Parts.filter((_, i) => i !== index);
    setFormData({ ...formData, Parts: newRows });
  };
  const handleInputChange = (index, field, value) => {
    const newRows = [...formData.Parts];
    newRows[index][field] = value;
    setFormData({ ...formData, Parts: newRows });
  };

  const handleUpdateClick = () => {
    if (bool === "true") {
      handleUpdateGame();
    } else {
      handleAddGame();
    }
  };
  const handleUpdateGame = async () => {
    setCircleFlag(true);
    let age = forAges.data.find((a) => a.Age === formData.AgeCode).AgeCode;
    let tchum = typesGames.find(
      (t) => t.gameTipeName === formData.GameTypeCode
    ).gameTypeCode;
    const updatedFormData = {
      ...formData,
      AgeCode: age,
      GameTypeCode: tchum,
    };
    const update = await UpdateGame(updatedFormData);
    if (update) {
      if (flagEqualCode === true) {
        const updateOneResponse = await UpdateCloset(codeOfCloset, [
          ...updateLocation,
          Number(placeInCloset),
        ]);
        if (updateOneResponse) {
          const updatedOneData = await updateOneResponse;
          dispatch(UPDATE_CLOSET(updatedOneData));
          setUpdateLocation([]);
          setCodeOfCloset();
          setPlaceInCloset();
        } else {
          console.error("Failed to update closet object");
        }
        setFlagEqualCode(false);
      } else {
        const updateResponse2 = await UpdateCloset(
          codeOfCloset,
          updateLocation2
        );
        if (updateResponse2) {
          const updatedData2 = await updateResponse2;
          dispatch(UPDATE_CLOSET(updatedData2));
          setUpdateLocation2([]);
          setCodeOfCloset();
          setPlaceInCloset();
        } else {
          console.error("Failed to update closet that free for the  first");
        }
        const updateResponse = await UpdateCloset(
          formData.ClosetNumber,
          updateLocation
        );
        if (updateResponse) {
          const updatedData = await updateResponse;
          dispatch(UPDATE_CLOSET(updatedData));
          setUpdateLocation([]);
        } else {
          console.error("Failed to update closet that take for the second ");
        }
      }
      dispatch(UPDATE_GAME(update));
      setButtonText("המשחק עודכן בהצלחה");
      setStatus("success");
      setTimeout(() => {
        navigate("/GamesList");
      }, 3000);
      setTimeout(() => {
        setCircleFlag(false);
      }, 1000);
    } else {
      setStatus("error");

      setButtonText("העדכון נכשל");
    }
  };
  const handleAddGame = async () => {
    setCircleFlag(true);
    let age = forAges.data.find((a) => a.Age === formData.AgeCode).AgeCode;
    let tchum = typesGames.find(
      (t) => t.gameTipeName === formData.GameTypeCode
    ).gameTypeCode;
    const updatedFormData = {
      ...formData,
      AgeCode: age,
      GameTypeCode: tchum,
    };
    const addResponse = await NewGameFunction(updatedFormData);
    setTimeout(() => {
      setCircleFlag(false);
    }, 1000);
    if (addResponse && addResponse.ok) {
      const updateResponse = await UpdateCloset(
        formData.ClosetNumber,
        updateLocation
      );
      if (updateResponse) {
        const updatedData = await updateResponse;
        dispatch(UPDATE_CLOSET(updatedData));
        setUpdateLocation([]);
      } else {
        console.error("Failed to update closet object");
      }
      dispatch(ADD_GAME(updatedFormData));
      setButtonText("המשחק נוסף בהצלחה");
      setStatus("success");
      setTimeout(() => {
        navigate("/GamesList");
      }, 3000);
    } else {
      setStatus("error");
      setButtonText("ההוספה נכשלה");
    }
  };
  return (
    <div className="new-game">
      <div className="add-game-title">
        <div className="add-game-icon"></div>
        {gameToUpdate === undefined ? (
          <div className="add-game-title-name">הוספת משחק</div>
        ) : (
          <div className="add-game-title-name"> עדכון משחק</div>
        )}
      </div>
      <div className="scrollBar">
        <section className="section">
          <Box
            margin="auto"
            width={"75vw"}
            height={"40vh"}
            my={4}
            display="column"
            alignContent="center"
            gap={4}
            p={2}
            sx={{
              display: "table",
              backgroundColor: "rgba(255, 255, 255, 1)",
              borderRadius: "28px",
            }}
          >
            <div className="new-game-title">
              <div className="vector-icon"></div>
              <div className="new-game-title-name">פרטי משחק</div>
            </div>
            <div className="line1">
              <div className="name-of-game">
                שם משחק{" "}
                <input
                  type="text"
                  className="game-name"
                  id="GameName"
                  value={formData.GameName}
                  onChange={(event) =>
                    setFormData({ ...formData, GameName: event.target.value })
                  }
                />
              </div>
              <div className="status-of-game">
                {" "}
                סטטוס משחק{" "}
                <select
                  name=""
                  id="GameStatus"
                  className="game-status"
                  value={formData.CurrentStateOfGame}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      CurrentStateOfGame: event.target.value,
                    })
                  }
                >
                  <option></option>
                  <option value="תקין">תקין</option>
                  <option value="חסרים חלקים">חסרים חלקים</option>
                </select>
              </div>
            </div>
            <div className="line2">
              <div className="range-of-age">
                טווח גילאים
                <select
                  className="select-range"
                  name="age"
                  id="age"
                  value={formData.AgeCode}
                  onChange={(event) =>
                    setFormData({ ...formData, AgeCode: event.target.value })
                  }
                >
                  <option></option>
                  {forAges?.data?.map((age, i) => (
                    <option id="i">{age.Age}</option>
                  ))}
                </select>
              </div>
              <div className="code-of-closet">
                קוד ארון{" "}
                <select
                  className="select"
                  id="closetCode"
                  name="closetCode"
                  value={formData.ClosetNumber}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      ClosetNumber: event.target.value,
                    })
                  }
                >
                  <option></option>
                  {Array.isArray(localClosets) &&
                    localClosets?.map((closet, i) => (
                      <option id="i">{closet.closetCode}</option>
                    ))}
                </select>
              </div>
              <div className="is-availible">
                <input
                  type="checkbox"
                  className="is-availible"
                  checked={
                    formData.IsAvailable === "true" ||
                    formData.IsAvailable === "TRUE"
                  }
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      IsAvailable: event.target.checked ? "TRUE" : "FALSE",
                    })
                  }
                />{" "}
                זמין להשאלה{" "}
              </div>
            </div>
            <div className="line3">
              <div className="type-of-game">
                תחום
                <select
                  className="select-type"
                  name="type"
                  id="type"
                  value={formData.GameTypeCode}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      GameTypeCode: event.target.value,
                    })
                  }
                >
                  <option></option>
                  {typesGames?.map((type, i) => (
                    <option id="i">{type.gameTipeName}</option>
                  ))}
                </select>
              </div>
              <div className="place-in-closet">
                מיקום בארון
                <select
                  className="select-place-in-closet"
                  id="placeincloset"
                  name="placeincloset"
                  value={formData.PlaceInCloset}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      PlaceInCloset: event.target.value,
                    })
                  }
                >
                  {bool === "true" && gameToUpdate && (
                    <option disabled>{gameToUpdate.PlaceInCloset}</option>
                  )}
                  <option></option>

                  {Array.isArray(localClosets) &&
                    localClosets?.map((closet, i) =>
                      closet?.closetCode === formData.ClosetNumber ? (
                        closet?.emptyPlace?.map((place) => (
                          <option id="i">{place}</option>
                        ))
                      ) : (
                        <div></div>
                      )
                    )}
                </select>
              </div>
              <div className="place-of-closet">
                מיקום הארון
                <input
                  className="closet-location"
                  type="text"
                  id="closetLocation"
                  value={formData.Location}
                  onChange={(event) =>
                    setFormData({ ...formData, Location: event.target.value })
                  }
                />
              </div>
              <div className="Complementary-Game">
                <input
                  type="checkbox"
                  className="Complementary-Game"
                  checked={
                    formData.HaveComplementaryGame === "true" ||
                    formData.HaveComplementaryGame === "TRUE"
                  }
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      HaveComplementaryGame: event.target.checked
                        ? "TRUE"
                        : "FALSE",
                    })
                  }
                />
                קיים משחק משלים
              </div>
            </div>
            <div className="line4">
              <input
                type="text"
                className="comment"
                value={formData.Comment}
                onChange={(event) =>
                  setFormData({ ...formData, Comment: event.target.value })
                }
              />
            </div>
          </Box>
          <Box
            width={"75vw"}
            height={"35vh"}
            my={4}
            gap={4}
            p={2}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 1)",
              borderRadius: "28px",
            }}
          >
            <div className="new-game-title">
              <div className="vector-icon"></div>
              <div className="new-game-title-name">חלקים למשחק </div>
            </div>
            <br />
            <div className="part-table-title">
              <div>שם החלק</div>
              <div>כמות</div>
              <div className="plus-icon" onClick={handleAddRow}></div>
            </div>
            <br />
            <div className="scrollBar2">
              <section className="section2">
                <table style={{ display: "block" }}>
                  <tbody>
                    {formData.Parts.map((row, index) => (
                      <tr key={index}>
                        <td className="add-parts">
                          <br />
                          <input
                            type="text"
                            value={row.name}
                            id="type-of-the-part"
                            className="type-of-the-part"
                            onChange={(e) =>
                              handleInputChange(index, "name", e.target.value)
                            }
                          />
                          <input
                            value={row.amount}
                            type="number"
                            id="amount-of-part"
                            className="amount-of-part"
                            onChange={(e) =>
                              handleInputChange(index, "amount", e.target.value)
                            }
                          />
                          <div
                            className="garb-icon"
                            onClick={() => handleDeleteRow(index)}
                          ></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>
          </Box>
          <Button
            variant="contained"
            onClick={handleUpdateClick}
            sx={{
              width: "120px",
              height: "35px",
              fontSize: "13px",
              fontWeight: "700",
              borderRadius: "30px",
              color: " rgba(255, 255, 255, 1)",
              textAlign: "center",
              marginRight: "70vw",
            }}
          >
            {circleFlag ? (
              <CircularProgress size={24} color="white" />
            ) : status === "success" ? (
              <CheckIcon />
            ) : status === "error" ? (
              <CloseIcon />
            ) : (
              "אישור"
            )}
          </Button>
        </section>
      </div>
    </div>
  );
};
