import React, { useState } from "react";
import "./homePage.css";
import Badge from "@mui/material/Badge";
import { AdminLoginModal } from "../AdminLoginModal/adminLoginModal";
import { Login } from "../Login/login";
import { SideBar } from "../SideBar/sideBar";
import { useLocation, useNavigate } from "react-router-dom";
import games from "../../assets/משחקים.svg";
import games2 from "../../assets/משחקים2.svg";
import users from "../../assets/מנויים.svg";
import users2 from "../../assets/מנויים2.svg";
import take from "../../assets/השאלות.svg";
import take2 from "../../assets/השאלות2.svg";
import other from "../../assets/אחר.svg";
import other2 from "../../assets/אחר2.svg";
import person from "../../assets/person.svg";
import person2 from "../../assets/person2.svg";
import history1 from "../../assets/history1.svg";
import history2 from "../../assets/history2.svg";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux";
import { SET_IS_ADMIN } from "../../app/slices/adminSlice";
import PasswordChangeModal from "../ChangePassword/changePassword";

export const HomePage = () => {
  const location = useLocation();
  const [code, setCode] = useState();
  const [name, setName] = useState("");
  const myLocation = location.pathname;
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChangePasswordVisible, setChangePasswordVisible] = useState(false);
  const takes = useSelector(
    (state) => state.takingOrReturning.takingsOrReturnings
  );
  const filteredTakes = takes.filter(
    (item) => !item.hasOwnProperty("ActualReturnDate")
  ).length;

  const navigate = useNavigate();
  const enterAsAdmin = () => {
    setIsModalVisible(true);
  };
  const exitAsAdmin = () => {
    dispatch(SET_IS_ADMIN(false));
    setIsModalVisible(false);
    navigate("/UsersList");
  };
  const handleDelay = () => {
    navigate("/ReturnAfterTimeList");
  };

  const changePassword = () => {
    setChangePasswordVisible(true);
  };
  const navigateFromUsersArr = [
    {
      name: "פרטים אישיים",
      src: person,
      srcChoosen: person2,
      to: "singleUser",
    },
    {
      name: "השאלות והחזרות",
      src: take,
      srcChoosen: take2,
      to: "singleUser/Taking_Returning",
    },
    {
      name: "היסטורית השאלות",
      src: history1,
      srcChoosen: history2,
      to: "singleUser/TakingHistory",
    },
  ];
  const namesArr = [
    { name: "מנויים", src: users, srcChoosen: users2, to: "UsersList" },
    { name: "משחקים", src: games, srcChoosen: games2, to: "GamesList" },
    {
      name: "דוחות",
      src: take,
      srcChoosen: take2,
      to: [
        { name: "חובות", to: "DebtList" },
        { name: "השאלות לאחר זמן", to: "ReturnAfterTimeList" },
      ],
    },
    {
      name: "רשימות",
      src: other,
      srcChoosen: other2,
      to: [
        { name: "השאלות", to: "TakeList" },
        { name: "ארונות", to: "ClosetsList" },
        { name: "תחומי משחק", to: "GameTopicList" },
        { name: "טווח גילאים", to: "AgesList" },
        { name: "קנסות לחלקים חסרים", to: "FinesList" },
        { name: "משחקים עם חלקים חסרים", to: "GamesWithMissingPartsList" },
      ],
    },
  ];
  const navToHomePage = () => {
    navigate("/UsersList");
  };
  return (
    <div className="image">
      <div className="nav-bar">
        {myLocation?.includes("singleUser") && (
          <Button
            sx={{
              height: "40px",
              marginLeft: "10px",
              top: "10px",
              backgroundColor: "rgba(240, 21, 87, 1)",
              border: "2px solid white",
              marginRight: "-52px",
            }}
            variant="contained"
            size="small"
            onClick={navToHomePage}
          >
            <ArrowBackIcon />
          </Button>
        )}
        <div className="display-3-icon">
          {isAdmin && (
            <IconButton onClick={handleDelay}>
              <NotificationsIcon className="reminder-icon" />
              <Badge
                badgeContent={filteredTakes}
                className="badge"
                color="error"
              />
            </IconButton>
          )}
          <Tooltip
            className="enterAsAdmin"
            title={isAdmin ? "יציאה מניהול מערכת" : "כניסה כמנהל"}
            onClick={isAdmin ? exitAsAdmin : enterAsAdmin}
            arrow
          >
            <span style={{ cursor: "pointer" }}>
              <IconButton>
                <AdminPanelSettingsIcon
                  className="setting-icon"
                  sx={{ color: "white" }}
                />
              </IconButton>
            </span>
          </Tooltip>
          {isAdmin && (
            <Tooltip
              className="changePassword"
              title=" החלף סיסמת מנהל"
              onClick={changePassword}
              arrow
            >
              <span style={{ cursor: "pointer" }}>
                <IconButton>
                  <LockIcon className="setting-icon" sx={{ color: "white" }} />
                </IconButton>
              </span>
            </Tooltip>
          )}
        </div>
        {name !== "" && code !== "" && (
          <div className="display-login-name">
            <div className="user-icon"></div>
            <div className="login-user-name">
              {isAdmin ? "צוות המשחקיה" : name}
            </div>
            <div className="pas-mafrid"></div>
          </div>
        )}
      </div>
      <div className="logo"></div>
      {isModalVisible && (
        <AdminLoginModal
          isModalOpen={true}
          closeModal={() => setIsModalVisible(false)}
        />
      )}
      {isChangePasswordVisible && <PasswordChangeModal />}
      {myLocation === "/" ? (
        <div className="login-comp">
          <Login setName={setName} setCode={setCode} />
        </div>
      ) : myLocation.includes("singleUser") ? (
        <div className="side-bar-comp">
          <SideBar navList={navigateFromUsersArr} />
        </div>
      ) : (
        <div className="side-bar-comp">
          <SideBar navList={namesArr} />
        </div>
      )}
    </div>
  );
};
