import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import { DELETE_USER } from "../../../app/slices/usersSlice";
import deleteUser from "../../DeleteFunctions/deleteUser";
import { generatePDF } from "../../exporttopdf/exportToPDF";
import { setSingleUser } from "../../../app/slices/singleUserSlice";
import Supervisor from "../../../assets/supervisor_account.svg";
import InputAdornment from "@mui/material/InputAdornment";
import "./usersList.css";
import PersonIcon from "@mui/icons-material/Person";
import "./usersList.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DoneIcon from "@mui/icons-material/Done";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { generatePDF } from "../../exporttopdf/exportToPDF";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { setSingleUser } from "../../../app/slices/singleUserSlice";

export const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [filteredUsers, setFilteredUsers] = useState(users.data || []);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredUsers(users.data || []);
  }, [users]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = users.data.filter((user) =>
      user.userName.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleDeleteUser = async (user) => {
    await deleteUser(user);
    dispatch(DELETE_USER(user));
  };


  const handleEditClick = (user) => {
    dispatch(setSingleUser(user));
    navigate("/singleUser/editUser", { state: { user } });
  };

  const navigateToAdd = () => {
    navigate(`/UsersList/newUser`);
  };
  const exportToPDF = () => {
    const columns = [
      "קוד מנוי",
      "שם מנוי",
      "תאריך מנוי",
      "טלפון 1 ",
      " טלפון 2 ",
      "שולם פקדון?",
      "סוג תשלום",
      "סכום לתשלום",
      "בנק",
      "חשבון בנק",
      "מס' שק",
      "סניף",
      "מייל",
    ];
    const data = filteredUsers;
    const title = "משתמשים";
    generatePDF(columns, data, title);
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

        <TextField
        dir="rtl"
        size="small"
        sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      borderRadius: "28px",
    },
  }}
          placeholder="חיפוש"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />


        <div className="usersCaptionWithIcon">
          <div className="menuim">מנויים</div>
          <img src={Supervisor} alt="Supervisor" />
        </div>
      </div>

      <div className="u-table-title">
        <h3 style={{ marginRight: "105px" }}> שם</h3>
        <h3 style={{ marginRight: "-27px" }}>תאריך מנוי</h3>
        <h3 style={{ marginRight: "17px" }}>טלפון 1</h3>
        <h3 style={{ marginRight: "14px" }}>טלפון 2 </h3>
        <h3> </h3>
        <h3> </h3>
        <h3 style={{ marginRight: "100px" }}> פרטי בנק</h3>
        <h3 style={{ marginRight: "40px" }}>מס' שק</h3>
        <div className="user-pdf-icon" onClick={() => exportToPDF()}>
          <PictureAsPdfIcon sx={{ color: "rgba(6, 120, 252, 1)" }} />
        </div>

      </div>

      <div className="table">
        <section className="section">
          {filteredUsers.map((user, i) => (
            <div key={i}>
              <div
                sx={{
                  fontSize: "15px",


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

