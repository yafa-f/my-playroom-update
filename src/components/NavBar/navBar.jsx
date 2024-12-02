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
    {
      name: "מנוי חדש",
      to: "NewUser",
    },
    {
      name: "משחק חדש",
      to: "NewGame",
    },
    {
      name: "החזרת משחק ",
      to: "GameBack",
    },
    {
      name: "רשימות",
      to: "GamesList",
    },
  ];
  const lists = [
    { name: "רשימת משחקים", to: "/GamesList" },
    { name: "רשימת משתמשים", to: "/UsersList" },
    { name: "רשימת טווח גילאים", to: "/AgesList" },
    { name: "רשימת תחומי משחק", to: "/GameTopicList" },
    { name: "רשימת ארונות במשחקיה", to: "/ClosetsList" },
  ];
  let navigate = useNavigate();
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
    <div>
      <div className="nav-bar">
        {navTo.map((i) => (
          <div key={i} className="links">
            {i.name === "רשימות" ? (
              <div>
                <Button
                  id="fade-button"
                  aria-controls={open ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onMouseOver={handleClick}
                >
                  <div className="lists-style">{i.name}</div>
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
                  {lists.map((list) => (
                    <MenuItem
                      onClick={() => handleCloseWithNavigate(list.name)}
                    >
                      {list.name}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ) : (
              <Link className="links-style" to={i.to}>
                {i.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
