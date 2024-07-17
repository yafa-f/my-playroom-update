import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { TableVirtuoso } from "react-virtuoso";

import "./genericLists.css";

export const List = () => {
  const location = useLocation();
  const { name } = location.state || {};
  const [nameOfList, setNameOfList] = useState([]);
  const games = useSelector((state) => state.game.games);
  const users = useSelector((state) => state.user.users);
  const forAges = useSelector((state) => state.forAge.forAges);
  const typesGames = useSelector((state) => state.typeGame.typesGames);
  const closets = useSelector((state) => state.closet.closets);

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
  }, [name, games, users, forAges, typesGames, closets]);

  const headers = Array.from(
    new Set(Array.isArray(nameOfList)&& nameOfList?.flatMap((item) => (item ? Object.keys(item) : [])))
  );
 
  const rows =
    nameOfList?.length > 0 && headers.length > 0
      ? nameOfList?.map((item, index) =>
          createData(index, ...Object.values(item))
        )
      : [];
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
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? "right" : "left"}
          >
            {typeof row[column.dataKey] === "object"
              ? JSON.stringify(row[column.dataKey])
              : row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <div className="table-container">
      <Paper style={{ height: 500, width: "90%"}}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={(index, row) => rowContent(index, row)}
        />
      </Paper>
    </div>
  );
};
