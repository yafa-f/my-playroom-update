import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { ADD_GAME, UPDATE_GAME } from "../../../app/slices/gameSlice";
import UpdateGame from "../../UpdateFunction/UpdateGame";
import "./newGame.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import NewGameFunction from "../../AddFunctions/NewGameFunction";
import { Box, TextField, Button, InputLabel ,Autocomplete} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export const NewGame = () => {
  const navigate = useNavigate();
  const { bool } = useParams();
  const location = useLocation();
  const { gameToUpdate } = location.state || {};
  const [status, setStatus] = useState(null);
  const [circleFlag, setCircleFlag] = useState(false);
  const dispatch = useDispatch();
  const forAges = useSelector((state) => state.forAge.forAges);
  const typesGames = useSelector((state) => state.typeGame.typesGames);
  const gamesSkills = useSelector((state) => state.gameSkills.gameSkills);
  const actualiGame = useSelector((state) => state.actualiGames.actualiGames);

  const [localClosets] = useState(useSelector((state) => state.closet.closets));
  const [formData, setFormData] = useState({
    GameName: "",
    GameType: [],
    GameSkills: [],
    ActualiGame: [],
    ClosetNumber: "",
    Age: [],
    IsAvailable: true,
    CurrentStateOfGame: "",
    Parts: [
      {
        "שם החלק": "",
        כמות: 0,
      },
    ],
    HaveComplementaryGame: false,
    Comment: "",
    cityCode: localStorage.getItem("cityCode") || "",
  });
  useEffect(() => {
    if (bool === "true" && gameToUpdate) {
      setFormData({
        ...gameToUpdate,
        cityCode:
          gameToUpdate.cityCode || localStorage.getItem("cityCode") || "",
      });
    }
  }, [bool, gameToUpdate]);
  useEffect(() => {
    if (bool === "true" && gameToUpdate) {
      setFormData({
        _id: gameToUpdate._id,
        ClosetNumber: gameToUpdate.ClosetNumber,
        GameName: gameToUpdate.GameName,
        GameType: gameToUpdate.GameType || [],
        GameSkills: gameToUpdate.GameSkills,
        ActualiGame: gameToUpdate.ActualiGame,
        Parts: gameToUpdate.Parts,
        Age: gameToUpdate.Age || [],
        CurrentStateOfGame: gameToUpdate.CurrentStateOfGame,
        HaveComplementaryGame: gameToUpdate.HaveComplementaryGame,
        IsAvailable: gameToUpdate.IsAvailable,
        Comment: gameToUpdate.Comment,
      });
    }
  }, [bool, gameToUpdate]);

  const handleAddRow = () => {
    setFormData({
      ...formData,
      Parts: [
        ...formData.Parts,
        {
          "שם החלק": "",
          כמות: 0,
        },
      ],
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
    const update = await UpdateGame(formData);
    if (update) {
      dispatch(UPDATE_GAME(update));
      setStatus("success");
      setTimeout(() => {
        navigate("/GamesList");
      }, 3000);
      setTimeout(() => {
        setCircleFlag(false);
      }, 1000);
    } else {
      setStatus("error");
      setCircleFlag(false);
    }
  };

  const handleAddGame = async () => {
    setCircleFlag(true);
    const addResponse = await NewGameFunction(formData);
    setTimeout(() => {
      setCircleFlag(false);
    }, 1000);
    if (addResponse) {
      dispatch(ADD_GAME(formData));
      setStatus("success");
      setTimeout(() => {
        navigate("/GamesList");
      }, 3000);
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="new-game">
      <div className="add-game-title">
        {gameToUpdate === undefined ? (
          <div className="add-game-title-name">הוספת משחק</div>
        ) : (
          <div className="add-game-title-name">עדכון משחק</div>
        )}
      </div>
      <div className="scrollBar">
        <section className="section">
          <Box
            margin="auto"
            width="75vw"
            p={3}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 1)",
              borderRadius: "28px",
              direction: "rtl",
            }}
          >
            <Box display="flex" flexDirection="column" mb={3}>
              <TextField
                id="GameName"
                value={formData.GameName}
                onChange={(event) =>
                  setFormData({ ...formData, GameName: event.target.value })
                }
                fullWidth
                inputProps={{ style: { textAlign: "right" } }}
                placeholder="שם משחק"
              />
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="repeat(4, 1fr)"
              gap={2}
              mb={3}
            >
              <Autocomplete
                options={["תקין", "חסרים חלקים"]}
                value={formData.CurrentStateOfGame || ""}
                onChange={(_, newValue) =>
                  setFormData({
                    ...formData,
                    CurrentStateOfGame: newValue,
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="בחר סטטוס משחק"
                    inputProps={{
                      ...params.inputProps,
                      style: { textAlign: "right" },
                    }}
                  />
                )}
              />

              <Autocomplete
                options={localClosets.map((c) => c.closet)}
                value={formData.ClosetNumber || ""}
                onChange={(_, newValue) =>
                  setFormData({
                    ...formData,
                    ClosetNumber: newValue,
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="בחר קוד ארון"
                    inputProps={{
                      ...params.inputProps,
                      style: { textAlign: "right" },
                    }}
                  />
                )}
              />
              <Box display="inline-flex" sx={{ marginRight: "2vw" }}>
                <InputLabel sx={{ marginTop: "15px" }}>זמין להשאלה</InputLabel>
                <Button
                  variant={formData.IsAvailable ? "contained" : "outlined"}
                  color="primary"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      IsAvailable: !formData.IsAvailable,
                    })
                  }
                  sx={{ minWidth: 0, marginRight: "2vw" }}
                >
                  {formData.IsAvailable ? <CheckIcon /> : <CloseIcon />}
                </Button>
              </Box>

              <Box display="inline-flex">
                <InputLabel sx={{ marginTop: "15px" }}>
                  קיים משחק משלים
                </InputLabel>
                <Button
                  variant={
                    formData.HaveComplementaryGame ? "contained" : "outlined"
                  }
                  color="primary"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      HaveComplementaryGame: !formData.HaveComplementaryGame,
                    })
                  }
                  sx={{ minWidth: 0, marginRight: "2vw" }}
                >
                  {formData.HaveComplementaryGame ? (
                    <CheckIcon />
                  ) : (
                    <CloseIcon />
                  )}
                </Button>
              </Box>
            </Box>

            <Box
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              gap={3}
              mb={3}
            >
              <Autocomplete
                multiple
                options={typesGames.map((type) => type.GameType)}
                value={formData.GameType}
                onChange={(_, newValue) =>
                  setFormData({ ...formData, GameType: newValue })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    pl="בחר תחום משחק"
                    inputProps={{
                      ...params.inputProps,
                      style: { textAlign: "right" },
                    }}
                  />
                )}
              />
              <Autocomplete
                multiple
                options={gamesSkills.map((skill) => skill.GameSkills)}
                value={formData.GameSkills}
                onChange={(_, newValue) =>
                  setFormData({ ...formData, GameSkills: newValue })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="בחר מיומנות משחק"
                    inputProps={{
                      ...params.inputProps,
                      style: { textAlign: "right" },
                    }}
                  />
                )}
              />
              <Autocomplete
                multiple
                options={actualiGame.map((act) => act.ActuliGame)}
                value={formData.ActualiGame}
                onChange={(_, newValue) =>
                  setFormData({ ...formData, ActualiGame: newValue })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="בחר אקטואלית משחק"
                    inputProps={{
                      ...params.inputProps,
                      style: { textAlign: "right" },
                    }}
                  />
                )}
              />
              <Autocomplete
                multiple
                options={forAges.map((age) => age.age)}
                value={formData.Age}
                onChange={(_, newValue) =>
                  setFormData({ ...formData, Age: newValue })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="בחר טווח גילאים"
                    inputProps={{
                      ...params.inputProps,
                      style: { textAlign: "right" },
                    }}
                  />
                )}
              />
            </Box>
            <TextField
              placeholder="הערה"
              fullWidth
              value={formData.Comment}
              onChange={(event) =>
                setFormData({ ...formData, Comment: event.target.value })
              }
            />
          </Box>

          <Box
            width={"75vw"}
            height={"auto"}
            my={4}
            p={2}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 1)",
              borderRadius: "28px",
            }}
          >
            <div className="part-table-title">
              <div>שם החלק</div>
              <div>כמות</div>
              <div className="plus-icon" onClick={handleAddRow}></div>
            </div>
            <div className="scrollBar2">
              <section className="section2">
                <table style={{ display: "block" }}>
                  <tbody>
                    {formData.Parts.map((row, index) => (
                      <tr key={index}>
                        <td className="add-parts">
                          <input
                            type="text"
                            value={row["שם החלק"]}
                            className="type-of-the-part"
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "שם החלק",
                                e.target.value
                              )
                            }
                          />
                          <input
                            value={row["כמות"]}
                            type="number"
                            className="amount-of-part"
                            onChange={(e) =>
                              handleInputChange(index, "כמות", e.target.value)
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
              color: "white",
              marginRight: "70vw",
            }}
          >
            {circleFlag ? (
              <CircularProgress size={24} color="inherit" />
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
