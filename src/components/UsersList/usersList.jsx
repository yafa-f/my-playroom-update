import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
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
import Fade from "@mui/material/Fade";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ButtonGroup from "@mui/material/ButtonGroup";
import { DELETE_USER } from "../../app/slices/usersSlice";
import { Edit } from "../EditFunctions/Edit/edit";
import deleteUser from "../DeleteFunctions/DeleteUser/deleteUser";
import Supervisor from "../../assets/supervisor_account.svg";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import "./usersList.css";
import { styled } from "@mui/system";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
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
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    setNameOfList(users.data);
    setOnSearch(false);
    setFieldValue("");
    setCurrentField("");
  }, [name, users]);
  useEffect(() => {}, [dispatch, currentStore, isEdit]);

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
    border: "1px solid black",
    backgroundColor: "white",
    "&:hover": {
      border: "2px solid black", 
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
  const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black", 
      },
      "&:hover fieldset": {
        borderColor: "black", 
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
        boxShadow: "none", 
      },
    },
  });

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
  const handleEditClick = (row) => {
    setIsEditClicked(true);
    setClickedRow(row);
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
          }}
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
            borderColor: "black",
            borderStyle: "200px",
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
              borderColor: "black",
              borderStyle: "200px",
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
      <div>
        <div className="buttonAndTextField">
          <Button
            sx={{ backgroundColor: "black" }}
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onMouseOver={handleClick}
          >
            <div className="list-style">
              חיפוש
              <SearchIcon />
            </div>
          </Button>
          {onSearch && (
            <TextField
              value={fieldValue}
              onChange={handleSearch}
              placeholder={currentField}
              sx={{ backgroundColor: "white" }}
            ></TextField>
          )}
          <Button
            sx={{
              backgroundColor: "black",
              color: "#fff",
              marginRight: "200px",
            }}
          >
            להוספה
          </Button>
        </div>

        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          TransitionComponent={Fade}
          onClose={handleClose}
        >
          {columns.map((column) => {
            if (column.label !== "Parts" && column.label !== "emptyPlace") {
              return (
                <MenuItem onClick={() => handleFilter(column.label)}>
                  {column.label}
                </MenuItem>
              );
            }
            return null;
          })}
        </Menu>
      </div>
      <Paper style={{ height: 500, width: "90%" }}>
        <TableVirtuoso
          data={chosenUser ? filteredRows : updatedRows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={(index, row) => rowContent(index, row)}
        />
      </Paper>
      {isEditClicked && (
        <Edit
          currentList={name}
          row={clickedRow}
          hideComponent={hide}
          edit={isEdit}
          editState={updateEditState}
        />
      )}
    </div>
  );
};
