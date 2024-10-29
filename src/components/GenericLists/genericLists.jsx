import React, { useState } from "react";
import { useEffect } from "react";
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
import "./genericLists.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ButtonGroup from "@mui/material/ButtonGroup";
import { DELETE_USER } from "../../app/slices/usersSlice";
import { DELETE_GAME } from "../../app/slices/gameSlice";
import { DELETE_CLOSET } from "../../app/slices/closetSlice";
import { DELETE_FOR_AGE } from "../../app/slices/forAgeSlice";
import { DELETE_TYPE_GAME } from "../../app/slices/typeGameSlice";
import deleteUser from "../DeleteFunctions/DeleteUser/DeleteUser";
import deleteGame from "../DeleteFunctions/DeleteGame/deleteGame";
import deleteForAge from "../DeleteFunctions/DeleteForAge/DeleteForAge";
import deleteTypeGame from "../DeleteFunctions/DeleteTypeGame/DeleteTypeGame";
import deleteCloset from "../DeleteFunctions/DeleteCloset/DeleteCloset";

export const List = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { name } = location.state || {};
  const [nameOfList, setNameOfList] = useState([]);
  const games = useSelector((state) => state.game.games);
  const users = useSelector((state) => state.user.users);
  const forAges = useSelector((state) => state.forAge.forAges);
  const typesGames = useSelector((state) => state.typeGame.typesGames);
  const closets = useSelector((state) => state.closet.closets);
  const [currentField, setCurrentField] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const [currentStore, setCurrentStore] = useState(null);
  const [currentDelete, setCurrentDelete] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  useEffect(() => {
    switch (name) {
      case "רשימת משחקים":
        setNameOfList(games);
        break;
      case "רשימת משתמשים":
        setNameOfList(users.data);
        break;
      case "רשימת טווח גילאים":
        setNameOfList(forAges.data);
        break;
      case "רשימת תחומי משחק":
        setNameOfList(typesGames);
        break;
      case "רשימת ארונות במשחקיה":
        setNameOfList(closets);
        break;
      default:
        setNameOfList([]);
    }
    setOnSearch(false);
    setFieldValue("");
    setCurrentField("");
  }, [name, games, users, forAges, typesGames, closets]);
  useEffect(() => {}, [dispatch, currentStore]);
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

  const filteredRows = updatedRows.filter(
    (row) =>
      Array.isArray(row[currentField]) && row[currentField].includes(fieldValue)
  );
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
  const editCurrent = (current) => {};
  const deleteCurrent = async (row) => {
    setCurrentDelete(row);
    switch (name) {
      case "רשימת משחקים":
        const deletedGameRow = await deleteGame(row);
        dispatch(DELETE_GAME(currentDelete));
        setCurrentStore(() => DELETE_GAME);
        break;
      case "רשימת משתמשים":
        const deletedUserRow = await deleteUser(row);
        dispatch(DELETE_USER(currentDelete));
        setCurrentStore(() => DELETE_USER);
        break;
      case "רשימת טווח גילאים":
        const deletedAgeRow = await deleteForAge(row);
        setCurrentStore(() => DELETE_FOR_AGE);
        dispatch(DELETE_FOR_AGE(currentDelete));
        break;
      case "רשימת תחומי משחק":
        const deletedTypeRow = await deleteTypeGame(row);
        setCurrentStore(() => DELETE_TYPE_GAME);
        dispatch(DELETE_TYPE_GAME(currentDelete));
        break;
      case "רשימת ארונות במשחקיה":
        const deletedClosetRow = await deleteCloset(row);
        setCurrentStore(() => DELETE_CLOSET);
        dispatch(DELETE_CLOSET(currentDelete));
        break;
      default:
        console.error(`no delete function found for ${nameOfList} `);
    }
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
            <Button onClick={editCurrent}>
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
          data={currentField ? filteredRows : updatedRows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={(index, row) => rowContent(index, row)}
        />
      </Paper>
    </div>
  );
};

