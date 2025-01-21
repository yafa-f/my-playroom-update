import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Menu from "@mui/material/Menu";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import "./navBar.css";

export const NavBar = () => {
  const navTo = [
    { name: "מנוי חדש", to: "NewUser" },
    { name: "משחק חדש", to: "NewGame" },
    { name: "החזרת משחק", to: "GameBack" },
    { name: "רשימות", to: "Lists" },
  ];

  const lists = [
    { name: "רשימת משחקים", to: "/GamesList" },
    { name: "רשימת משתמשים", to: "/UsersList" },
    { name: "רשימת טווח גילאים", to: "/AgesList" },
    { name: "רשימת תחומי משחק", to: "/GameTopicList" },
    { name: "רשימת ארונות במשחקיה", to: "/ClosetsList" },
  ];

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseWithNavigate = (name) => {
    navigate("/List", { state: { name } });
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="nav-bar">
      {navTo.map((item, index) => (
        <div key={index} className="links">
          {item.name === "רשימות" ? (
            <div>
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onMouseOver={handleClick}
              >
                <div className="lists-style">{item.name}</div>
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                {lists.map((list, listIndex) => (
                  <MenuItem
                    key={listIndex}
                    onClick={() => handleCloseWithNavigate(list.name)}
                  >
                    {list.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          ) : (
            <Link className="links-style" to={item.to}>
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};
