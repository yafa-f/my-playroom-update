import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { ADD_GAME } from "../../app/slices/gameSlice";
import { UPDATE_CLOSET } from "../../app/slices/closetSlice";
import UpdateGame from "../UpdateFunction/UpdateGame";
import { UPDATE_GAME } from "../../app/slices/gameSlice";
import "./newGame.css";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NewGameFunction from "../AddFunctions/NewGameFunction/NewGameFunction";
import UpdateCloset from "../UpdateFunction/UpdateCloset";

export const NewGame = (props) => {
  const { bool } = useParams();
  const location = useLocation();
  const { gameToUpdate } = location.state || {};
  useEffect(() => {
    if (bool && gameToUpdate) {
      setFormData(gameToUpdate);
    }
  }, [bool, gameToUpdate]);

  const [formData, setFormData] = useState({
    Id: "",
    GameCode: "",
    ClosetNumber: "",
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
  const [textGameCodeValue, setTextGameCodeValue] = useState("");
  const [textLocationInClosetValue, setTextLocationInClosetValue] =
    useState("");
  const [circleFlag, setCircleFlag] = useState(false);
  const [buttonText, setButtonText] = useState("אישור");
  const dispatch = useDispatch();
  const forAges = useSelector((state) => state.forAge.forAges);
  const typesGames = useSelector((state) => state.typeGame.typesGames);
  const [localClosets, setLocalClosets] = useState(
    useSelector((state) => state.closet.closets)
  );
  const [updateLocation, setUpdateLocation] = useState([]);
  const navigate = useNavigate();
  const [localGames, setLocalGames] = useState(
    useSelector((state) => state.game.games)
  );
  useEffect(() => {}, [localGames]);
  useEffect(() => {}, [localClosets]);
  useEffect(() => {
    const selectedClosetArray =
      Array.isArray(localClosets) &&
      localClosets?.filter(
        (closet) => closet?.closetCode === formData.ClosetNumber
      )[0]?.emptyPlace;
    if (selectedClosetArray) {
      if (
        Array.isArray(selectedClosetArray) &&
        selectedClosetArray.length === 1
      ) {
        const updatedNumbers = [textLocationInClosetValue + 1];
        setUpdateLocation(updatedNumbers);
      } else if (
        textLocationInClosetValue !== Math.max(...selectedClosetArray)
      ) {
        const updatedNumbers = selectedClosetArray.filter(
          (number) => number !== textLocationInClosetValue
        );
        setUpdateLocation(updatedNumbers);
      } else if (
        Array.isArray(selectedClosetArray) &&
        textLocationInClosetValue === Math.max(...selectedClosetArray)
      ) {
        const updatedNumbers = [
          ...selectedClosetArray.filter(
            (number) => number !== textLocationInClosetValue
          ),
          textLocationInClosetValue + 1,
        ];
        setUpdateLocation(updatedNumbers);
      }
    }
  }, [textLocationInClosetValue]);

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

  const handleClosetNumberChange = (event) => {
    // setTextClosetNumberValue(event.target.value);
    setFormData({ ...formData, ClosetNumber: event.target.value });

    // const isClosetEmpty = localClosets.find(
    //   (closet) => closet.closetCode === event.target.value
    // );
    // isClosetEmpty.emptyPlace.length > 0
    //   ? setIsLocationInClosetDisabled(true)
    //   : setIsLocationInClosetDisabled(false);
    // setStyleClosetCode(false);
  };
  const handleGameNameChange = (event) => {
    setFormData({ ...formData, GameName: event.target.value });
  };
  const handleGameStatusChange = (event) => {
    setFormData({ ...formData, CurrentStateOfGame: event.target.value });
  };
  const handleClosetLocationChange = (event) => {
    setFormData({ ...formData, Location: event.target.value });
  };
  const handleAgeCodeChange = (event) => {
    setFormData({ ...formData, AgeCode: event.target.value });
  };
  const handleGameTypeCodeChange = (event) => {
    setFormData({ ...formData, GameTypeCode: event.target.value });
  };
  const handleHaveComplementaryGameChange = (event) => {
    setFormData({ ...formData, HaveComplementaryGame: event.target.value });
  };
  const handleIsAvailableChange = (event) => {
    setFormData({ ...formData, IsAvailable: event.target.value });
  };

  const handleLocationInClosetChange = (event) => {
    setTextLocationInClosetValue(event.target.value);
  };
  const handleGameCommentChange = (event) => {
    setFormData({ ...formData, Comment: event.target.value });
  };

  const handleUpdateClick = () => {
    console.log("Current bool value:", bool);

    if (bool === "true") {
      handleUpdateGame();
    } else {
      handleAddGame();
    }
  };

  const handleUpdateGame = async () => {
    setCircleFlag(true);
    const update = await UpdateGame(formData);
    setTimeout(() => {
      setCircleFlag(false);
    }, 1000);
    if (update && update.ok) {
      dispatch(UPDATE_GAME(formData));
      setButtonText("המשחק עודכן בהצלחה");
      setTimeout(() => {
        setButtonText("עדכון");
      }, 2000);
    } else {
      setButtonText("העדכון נכשל");
    }
  };
  const handleAddGame = async () => {
    setCircleFlag(true);
    const addResponse = await NewGameFunction(formData);
    setTimeout(() => {
      setCircleFlag(false);
    }, 1000);

    if (addResponse && addResponse.ok) {
      const updateResponse = await UpdateCloset(
        formData.ClosetNumber,
        updateLocation
      );

      if (updateResponse && updateResponse.ok) {
        // const updatedObject = await updateResponse.json();
        dispatch(UPDATE_CLOSET(updateResponse.json()));
        setUpdateLocation([]);
      } else {
        console.error("Failed to add object");
      }
      setTextGameCodeValue("");
      setTextLocationInClosetValue("");
      setButtonText("המשחק נוסף בהצלחה");

      dispatch(ADD_GAME(formData));
      setTimeout(() => {
        setButtonText("הוספה");
      }, 2000);
    } else {
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
                  onChange={handleGameNameChange}
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
                  onChange={handleGameStatusChange}
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
                  onChange={handleAgeCodeChange}
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
                  onChange={handleClosetNumberChange}
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
                  type="radio"
                  className="is-availible"
                  checked={formData.IsAvailable}
                  onChange={handleIsAvailableChange}
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
                  onChange={handleGameTypeCodeChange}
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
                  value={textLocationInClosetValue}
                  onChange={handleLocationInClosetChange}
                >
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
                  onChange={handleClosetLocationChange}
                />
              </div>
              <div className="Complementary-Game">
                <input
                  type="radio"
                  className="Complementary-Game"
                  checked={formData.HaveComplementaryGame}
                  onChange={handleHaveComplementaryGameChange}
                />
                קיים משחק משלים
              </div>
            </div>
            <div className="line4">
              <input
                type="text"
                className="comment"
                value={formData.Comment}
                onChange={handleGameCommentChange}
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
            {circleFlag && <CircularProgress sx={{ color: "white" }} />}
            {buttonText}
          </Button>
        </section>
      </div>
    </div>
  );
};
