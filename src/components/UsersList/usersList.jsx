import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../../components/GenericLists/genericLists.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ButtonGroup from "@mui/material/ButtonGroup";
import { DELETE_USER } from "../../app/slices/usersSlice";
import deleteUser from "../DeleteFunctions/DeleteUser/deleteUser";
import Supervisor from "../../assets/supervisor_account.svg";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import "./usersList.css";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/system";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneIcon from "@mui/icons-material/Done";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { setSingleUser } from "../../app/slices/singleUserSlice";
export const UsersList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { name } = location.state || {};
  const [nameOfList, setNameOfList] = useState([]);
  const users = useSelector((state) => state.user.users);
  const [currentField, setCurrentField] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const [currentStore, setCurrentStore] = useState(null);
  const [currentDelete, setCurrentDelete] = useState("");
  const [currentEdit, setCurrentEdit] = useState("");
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [clickedRow, setClickedRow] = useState(null);
  const [onSearch, setOnSearch] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [arrowUpAndDown, setArrowUpAndDown] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [chosenUser, setChosenUser] = useState("");
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [prevLocation, setPrevLocation] = useState(location);

  const navigate = useNavigate();
  useEffect(() => {
    setNameOfList(users.data);
    setOnSearch(false);
    setFieldValue("");
    setCurrentField("");
  }, [name, users]);
  useEffect(() => {
    setPrevLocation(location);
  }, [dispatch, currentStore, isEdit, location, prevLocation]);

  const headers = Array.from(
    new Set(nameOfList.flatMap((item) => (item ? Object.keys(item) : [])))
  );
  const rows =
    nameOfList.length > 0 && headers.length > 0
      ? nameOfList.map((item, index) =>
          createData(index, ...Object.values(item))
        )
      : [];

  const updatedRows = rows.map((row) => {
    const updatedRow = {};
    headers.forEach((header, index) => {
      updatedRow[header] = row[index];
    });
    return updatedRow;
  });
  const filteredRows = updatedRows.filter((row) => {
    return (
      typeof row["userName"] === "string" &&
      row["userName"].includes(chosenUser)
    );
  });
  const handleSearch = (e) => {
    setFieldValue(e.target.value);
  };
  const columns = headers.map((header, index) => ({
    width: 200,
    label: header,
    dataKey: index.toString(),
    numeric: false,
  }));
  function createData(id, ...values) {
    const data = {};
    headers.forEach((header, index) => {
      data[index.toString()] = values[index];
    });
    return { id, ...data };
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const CustomButton = styled(Button)(({ theme }) => ({
    borderColor: "transparent",
    backgroundColor: "white",
    "&:hover": {
      borderColor: "transparent",
      backgroundColor: "white",
      boxShadow: "none",
    },
  }));
  const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
        boxShadow: "none",
      },
      backgroundColor: "white",
    },
  });
  const CustomIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: "transparent",
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "transparent",
    },
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilter = (name) => {
    setOnSearch(true);
    setCurrentField(name);
    setAnchorEl(null);
    setFieldValue("");
  };
  const handleEditClick = (user) => {
    setIsEditClicked(true);
    setClickedRow(user);
    navigate("editUser", { state: { user } });
  };
  const updateEditState = () => {
    setIsEdit(!isEdit);
  };
  const hide = () => {
    setIsEditClicked(false);
  };
  const deleteCurrent = async (row) => {
    setCurrentDelete(row);
    const deletedUserRow = await deleteUser(row);
    dispatch(DELETE_USER(currentDelete));
    setCurrentStore(() => DELETE_USER);
  };
  const handleDoubleClick = (user) => {
    dispatch(setSingleUser(user));
    navigate("/singleUser", { state: { user } });
  };
  const navigateToAdd = () => {
    navigate(`/UsersList/newUser`);
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
  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? "right" : "left"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }
  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {headers.map((header) => (
          <TableCell
            key={header}
            align={typeof row[header] === "number" ? "right" : "left"}
          >
            {typeof row[header] === "object"
              ? JSON.stringify(row[header])
              : row[header]}
          </TableCell>
        ))}
        <TableCell>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={() => handleEditClick(row)}>
              עריכה <EditIcon></EditIcon>
            </Button>
            <Button
              onClick={() => {
                deleteCurrent(row);
              }}
            >
              מחיקה<DeleteForeverIcon></DeleteForeverIcon>
            </Button>
          </ButtonGroup>
        </TableCell>
      </React.Fragment>
    );
  }

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
          onClick={navigateToAdd}
        >
          מנוי +
        </Button>

        <CustomTextField
          variant="outlined"
          sx={{
            textAlign: "center",
            fontSize: 18,
            fontFamily: "Open Sans Hebrew",
            color: "black",
            borderRadius: 28,
            width: 220,
            height: 20,
            fontWeight: 700,
            wordWrap: "break-word",
            "& .MuiOutlinedInput-root": {
              borderRadius: "28px",
              height: "38px",
              direction: "rtl",
            },
          }}
          placeholder="חיפוש"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        ></CustomTextField>
        <div>
          <CustomButton
            ref={buttonRef}
            onClick={openMenu}
            variant="outlined"
            sx={{
              textAlign: "center",
              fontSize: 18,
              fontFamily: "Open Sans Hebrew",
              color: "black",
              borderRadius: 28,
              width: 220,
              height: 38,
              fontWeight: 700,
              wordWrap: "break-word",
            }}
          >
            <div
              style={{ display: "inline-flex", gap: "50px", direction: "rtl" }}
            >
              <div
                style={{
                  width: 140,
                  marginTop: 7,
                  fontWeight: 100,
                  marginLeft: -60,
                  marginRight: 65,
                }}
              >
                {chosenUser ? chosenUser : "שם מנוי"}{" "}
              </div>
              <div style={{ marginTop: 6 }}>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    clearUserName();
                  }}
                >
                  {" "}
                  {chosenUser && (
                    <CloseRoundedIcon
                      sx={{ color: "black" }}
                    ></CloseRoundedIcon>
                  )}
                </Button>
              </div>
              <div style={{ marginTop: 2, marginLeft: 80, marginRight: -70 }}>
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
            {updatedRows.map((user) => (
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
          <img src={Supervisor.toString()}></img>
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
        <h3 style={{ marginRight: "60px" }}>מס' שק</h3>
      </div>
      <div className="table">
        <section className="section">
          {(chosenUser ? filteredRows : updatedRows)?.map((user, i) => (
            <div key={i}>
              <div
                sx={{
                  height: "15vh",
                  direction: "rtl",
                  borderBottom: "2px rgba(6, 120, 252, 0.20) solid",
                }}
              >
                <div className="user-column">
                  <div className="user-details">
                    <div>
                      <div style={{ marginRight: "12px" }}>
                        <PersonIcon color="#686464"></PersonIcon>
                      </div>
                    </div>
                    <button
                      className="user-attribute"
                      style={{
                        fontWeight: 600,
                        marginRight: "0px",
                        fontSize: "17px",
                        width: "155px",
                        backgroundColor: "white",
                        borderColor: "transparent",
                      }}
                      onDoubleClick={() => handleDoubleClick(user)}
                    >
                      {user.userName}
                    </button>
                    <div
                      className="user-attribute"
                      style={{ width: "150px", marginRight: "10px" }}
                    >
                      {user.userDate}
                    </div>
                    <div
                      className="user-attribute"
                      style={{ marginRight: "-47px" }}
                    >
                      {user.cellphone}
                    </div>
                    <div className="user-attribute">{user.phone}</div>
                    {user.depositPaid?.toLowerCase() === "true" ? (
                      <div
                        className="user-attribute"
                        style={{ display: "inline-flex", marginLeft: "40px" }}
                      >
                        {" "}
                        <DoneIcon color="success"></DoneIcon>שולם פקדון
                      </div>
                    ) : (
                      <div
                        className="user-attribute"
                        style={{
                          display: "inline-flex",
                          marginLeft: "40px",
                        }}
                      >
                        {" "}
                        <CloseRoundedIcon
                          sx={{ color: "red" }}
                        ></CloseRoundedIcon>
                        לא שולם פקדון{" "}
                      </div>
                    )}
                    <div
                      className="user-attribute"
                      style={{ display: "inline-flex", width: "160px" }}
                    >
                      <div className="coinsImg"></div>
                      <div className="total">
                        {user.totalPayment ? user.totalPayment : "0.00"} ש"ח
                      </div>
                      <div className="line"> </div>
                      <div className="type">{user.paymentType}</div>
                    </div>
                    <div
                      className="user-attribute"
                      style={{ width: "180px", marginRight: "40px" }}
                    >
                      {user.bankNumber}-{user.branchNumber}-{user.accountNumber}
                    </div>
                    <div className="user-attribute">{user.checkNumber}</div>
                    <Button
                      style={{
                        width: "1px",
                        height: "2px",
                        marginRight: "-50px",
                      }}
                      onClick={() => {
                        handleEditClick(user);
                      }}
                    >
                      <EditIcon></EditIcon>{" "}
                    </Button>{" "}
                    <Button
                      style={{
                        width: "1px",
                        height: "2px",
                        marginRight: "-10px",
                      }}
                    >
                      <DeleteOutlineIcon></DeleteOutlineIcon>{" "}
                    </Button>{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
