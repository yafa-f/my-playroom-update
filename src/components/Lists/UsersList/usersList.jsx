import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_USER } from "../../../app/slices/usersSlice";
import deleteUser from "../../DeleteFunctions/deleteUser";
import { generatePDF } from "../../exporttopdf/exportToPDF";
import { setSingleUser } from "../../../app/slices/singleUserSlice";
import Supervisor from "../../../assets/supervisor_account.svg";
import "./usersList.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DoneIcon from "@mui/icons-material/Done";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const UsersList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state || {};
  const users = useSelector((state) => state.user.users);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const buttonRef = useRef(null);
  const [nameOfList, setNameOfList] = useState([]);
  const [chosenUser, setChosenUser] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [arrowUpAndDown, setArrowUpAndDown] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (users && users.data) {
      setNameOfList(users.data);
    } else {
      setNameOfList([]);
    }
  }, [users]);

  useEffect(() => {
    if (nameOfList) {
      setFilteredRows(
        nameOfList.filter((row) => row["userName"]?.includes(chosenUser))
      );
    }
  }, [nameOfList, chosenUser]);

  const handleDeleteUser = async (user) => {
    await deleteUser(user);
    dispatch(DELETE_USER(user));
    alert("נמחק");
  };

  const exportToPDF = () => {
    const columns = [
      "קוד מנוי",
      "שם מנוי",
      "תאריך מנוי",
      "טלפון 1",
      "טלפון 2",
      "שולם פקדון?",
      "סוג תשלום",
      "סכום לתשלום",
      "בנק",
      "חשבון בנק",
      "מס' שק",
      "סניף",
      "מייל",
    ];
    const data = chosenUser ? filteredRows : nameOfList;
    generatePDF(columns, data, "משתמשים");
  };

  const CustomButton = styled(Button)(({ theme }) => ({
    borderColor: "transparent",
    backgroundColor: "white",
    "&:hover": {
      borderColor: "transparent",
      backgroundColor: "white",
      boxShadow: "none",
    },
  }));

  const CustomIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: "transparent",
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "transparent",
    },
  }));

  const handleEditClick = (user) => {
    dispatch(setSingleUser(user));
    navigate("/singleUser/editUser", { state: { user } });
  };

  const openMenu = (event) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom, left: rect.left });
    }
    setMenuAnchor(event.currentTarget);
    setArrowUpAndDown(!arrowUpAndDown);
  };

  const closeMenu = (user) => {
    setChosenUser(user);
    setMenuAnchor(null);
  };

  const clearUserName = () => {
    setChosenUser("");
  };

  const handleDoubleClick = (user) => {
    dispatch(setSingleUser(user));
    navigate("/singleUser", { state: { user } });
  };

  return (
    <div className="table-container">
      <div className="usersTitle">
        <Button
          variant="contained"
          sx={{
            textAlign: "center",
            fontSize: 18,
            fontFamily: "Open Sans Hebrew",
            background: "#0678fc",
            color: "white",
            borderRadius: 28,
            width: 135,
            height: 38,
            fontWeight: 700,
            wordWrap: "break-word",
            marginLeft: "-23.2vw",
          }}
          onClick={() => {
            navigate(`/UsersList/newUser`);
          }}
        >
          + מנוי
        </Button>
        <div>
          <CustomButton
            ref={buttonRef}
            variant="outlined"
            sx={{
              color: "black",
              borderRadius: 28,
              width: 180,
              height: 36,
              fontWeight: 700,
              fontSize: 15,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <div className="arroundOpenMenu">
              <div className="openMenu" onClick={openMenu}>
                {chosenUser ? chosenUser : "שם מנוי"}{" "}
              </div>
              {chosenUser !== "" && (
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
            {filteredRows.map((user) => (
              <MenuItem
                sx={{ direction: "rtl" }}
                key={user.userName}
                onClick={() => closeMenu(user.userName)}
              >
                {user.userName}
              </MenuItem>
            ))}
          </Menu>
        </div>

        <div className="usersCaptionWithIcon">
          <div className="menuim">מנויים</div>
          <img src={Supervisor} alt="Supervisor" />
        </div>
      </div>

      <div className="u-table-title">
        <h3 style={{ marginRight: "40px" }}>שם</h3>
        <h3 style={{ marginRight: "-12px" }}>תאריך מנוי</h3>
        <h3 style={{ marginRight: "52px" }}>טלפון 1</h3>
        <h3 style={{ marginRight: "22px" }}>טלפון 2</h3>
        <h3></h3>
        <h3></h3>
        <h3 style={{ marginRight: "130px" }}>פרטי בנק</h3>
        <h3 style={{ marginRight: "60px" }}>מס' שק</h3>
      </div>

      <div className="table">
        {filteredRows.map((user, i) => {
          const isDepositPaid =
            user.depositPaid?.toLowerCase() === "true" ||
            user.depositPaid === true;

          return (
            <div
              key={i}
              className="user-row"
              onDoubleClick={() => handleDoubleClick(user)}
            >
              <div
                className="user-data"
                style={{
                  fontWeight: 600,
                  marginRight: 15,
                }}
              >
                {user.userName}
              </div>
              <div className="user-data">{user.userDate}</div>
              <div className="user-data">{user.cellphone}</div>
              <div className="user-data">{user.phone}</div>
              <div
                className="user-data"
                style={{ display: "inline-flex", width: "160px" }}
              >
                {isDepositPaid ? (
                  <DoneIcon color="success" />
                ) : (
                  <CloseRoundedIcon color="warning" />
                )}
                {isDepositPaid ? "שולם פקדון" : "לא שולם פקדון"}
              </div>
              <div
                className="user-attribute"
                style={{ display: "inline-flex", width: "210px" }}
              >
                <div className="coinsImg" />
                <div className="total">{user.totalPayment || "0.00"} ש"ח</div>
                <div className="line" />
                <div className="type">{user.paymentType}</div>
              </div>
              <div />
              <div
                className="user-data"
                style={{ width: "180px" }}
              >{`${user.bankNumber}-${user.branchNumber}-${user.accountNumber}`}</div>
              <div className="user-data" style={{ width: "100px" }}>
                {user.checkNumber}
              </div>
              <div className="user-data">
                <Button
                  className="user-data-icon"
                  onClick={() => handleEditClick(user)}
                >
                  <EditIcon />
                </Button>
                <Button
                  className="user-data-icon"
                  onClick={() => handleDeleteUser(user)}
                >
                  <DeleteOutlineIcon />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
