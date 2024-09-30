import { useState, useRef, useEffect } from "react";
import "./gamesList.css";
import { Button, MenuItem, Menu } from "@mui/material";
import { styled } from "@mui/system";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
export const SearchButtons = (props) => {
  const [selectArray, setSelectArray] = useState();
  const [selectArrayFilter, setSelectArrayFilter] = useState();
  const games = useSelector((state) => state.game.games);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [arrowUpAndDown, setArrowUpAndDown] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [chosenUser, setChosenUser] = useState("");
  const typesGames = useSelector((state) => state.typeGame.typesGames);
  const forAges = useSelector((state) => state.forAge.forAges).data;
  const closets = useSelector((state) => state.closet.closets);
  const buttonRef = useRef(null);

  useEffect(() => {
    switch (props.name) {
      case "תחום":
        {
          const type = typesGames.map((item) => item.gameTipeName);
          setSelectArray(type);
        }
        break;
      case "טווח גילאים":
        {
          const age = forAges.map((item) => item.Age);
          setSelectArray(age);
        }
        break;
      case "סטטוס משחק":
        setSelectArray(["תקין", "חסרים חלקים"]);
        break;
      case "מס’ ארון":
        {
          const closetCodes = closets.map((item) => item.closetCode);
          setSelectArray(closetCodes);
        }
        break;
      case "סטטוס השאלה":
        setSelectArray(["מושאל", "במשחקייה"]);
        break;
      default:
        setSelectArray([]);
    }
  }, [props.name, typesGames, forAges, closets]);

  useEffect(() => {
    switch (props.name) {
      case "תחום":
        {
          const filteredRows = games.filter((row) => {
            return (
              typeof row["GameTypeCode"] === "string" &&
              row["GameTypeCode"].includes(chosenUser)
            );
          });
          setSelectArrayFilter(filteredRows);
        }
        break;
      case "טווח גילאים":
        {
          const filteredRows = games.filter((row) => {
            return (
              typeof row["AgeCode"] === "string" &&
              row["AgeCode"].includes(chosenUser)
            );
          });
          setSelectArrayFilter(filteredRows);
        }
        break;
      case "סטטוס משחק":
        const filteredRows = games.filter((row) => {
          return (
            typeof row["CurrentStateOfGame"] === "string" &&
            row["CurrentStateOfGame"].includes(chosenUser)
          );
        });
        setSelectArrayFilter(filteredRows);
        break;
      case "מס’ ארון":
        {
          const filteredRows = games.filter((row) => {
            return (
              typeof row["ClosetNumber"] === "string" &&
              row["ClosetNumber"].includes(chosenUser)
            );
          });
          setSelectArrayFilter(filteredRows);
        }
        break;
      // צריך לעדכן בדאטה בייס ולשנות
      case "סטטוס השאלה":
        setSelectArray(["מושאל", "במשחקייה"]);

        break;
      default:
        setSelectArray([]);
    }
  }, [chosenUser]);
  useEffect(() => {
    props.setTableArr(selectArrayFilter);
  }, [selectArrayFilter]);
  const closeMenu = (user) => {
    setChosenUser(user);
    setMenuAnchor(null);
  };
  const clearUserName = () => {
    setChosenUser("");
  };

  const openMenu = (event) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom, left: rect.left });
    }
    setMenuAnchor(event.currentTarget);
    setArrowUpAndDown(!arrowUpAndDown);
  };

  const CustomIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: "transparent",
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "transparent",
    },
  }));
  const CustomButton = styled(Button)(({ theme }) => ({
    borderColor: "transparent",
    backgroundColor: "white",
    "&:hover": {
      borderColor: "transparent",
      backgroundColor: "white",
      boxShadow: "none",
    },
  }));

  return (
    <div>
      <CustomButton
        ref={buttonRef}
        variant="outlined"
        sx={{
          fontSize: 16,
          color: "black",
          borderRadius: 28,
          width: 180,
          height: 36,
          fontWeight: 700,
        }}
      >
        <div style={{ display: "inline-flex", direction: "rtl", width: 180 }}>
          <div
            onClick={openMenu}
            style={{
              width: "10vw",
              marginTop: 7,
              fontWeight: 100,
              marginLeft: "40px",
            }}
          >
            {chosenUser !== "" ? chosenUser : props.name}
          </div>
          {chosenUser != "" && (
            <CloseRoundedIcon
              sx={{ color: "black", marginTop: "9px" }}
              onClick={(event) => {
                event.stopPropagation();
                clearUserName();
              }}
            ></CloseRoundedIcon>
          )}
          <div style={{ marginTop: 2 }}>
            <CustomIconButton
              sx={{
                backgroundColor: "transparent",
                border: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  border: "none",
                },
              }}
            >
              {menuAnchor ? (
                <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
              ) : (
                <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
              )}
            </CustomIconButton>
          </div>
        </div>
      </CustomButton>
      <Menu
        sx={{
          height: 500,
          position: "absolute",
          top: position.top,
          left: position.left,
        }}
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        {Array.isArray(selectArray) &&
          selectArray.map((item) => (
            <MenuItem
              sx={{ direction: "rtl" }}
              key={item}
              onClick={() => closeMenu(item)}
            >
              {item}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};
