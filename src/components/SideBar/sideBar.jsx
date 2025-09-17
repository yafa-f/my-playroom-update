
import  { useState } from "react";
import "./sideBar.css";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const SideBar = ({ navList }) => {
  const [expanded, setExpanded] = useState(false);
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  const location = useLocation();
  const myLocation = location.pathname;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={`side-bar ${myLocation === "/" ? "login" : ""}`}>
      {navList?.map((name, i) => {
        const isBoolPath = myLocation.includes("bool") || myLocation.startsWith("/singleUser/editUser");
        const isSelected = isAdmin || ["GamesList", "UsersList"].includes(name.to) || myLocation.includes("singleUser");

        if (isSelected) {
          const isActive = (isBoolPath && myLocation.includes(`/${name.to}`)) || myLocation.endsWith(`/${name.to}`);

          return (
            <div key={i}>
              {["רשימות", "דוחות"].includes(name.name) ? (
                <Accordion
                  expanded={expanded === `panel${i}`}
                  onChange={handleChange(`panel${i}`)}
                  sx={{ direction: "rtl", backgroundColor: "transparent", color: "white", marginTop: "4vh", fontWeight: "500" }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
                    <img className="accor-img-icon" src={name.src} alt={name.name} />
                    {name.name}
                  </AccordionSummary>
                  <AccordionDetails sx={{ direction: "rtl", display: "flex", flexDirection: "column" }}>
                    {name.to.map((item, index) => (
                      <div key={index} className={`accor-list-names ${isBoolPath ? myLocation.includes(`/${item.to}`) : myLocation.endsWith(`/${item.to}`) ? "choosen" : ""}`}>
                        <Link to={item.to} className={`accor-side-names ${isBoolPath ? myLocation.includes(`/${item.to}`) : myLocation.endsWith(`/${item.to}`) ? "choosen" : ""}`}>
                          {item.name}
                        </Link>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ) : (
                <div className={`side-list ${isBoolPath ? myLocation.includes(`/${name.to}`) : myLocation.endsWith(`/${name.to}`) ? "choosen" : ""}`} key={i}>
                  <img className={"img-icon"} src={isBoolPath ? (myLocation.includes(`/${name.to}`) ? name.srcChoosen : name.src) : (myLocation.endsWith(`/${name.to}`) ? name.srcChoosen : name.src)} alt={name.name} />
                  <Link className={`side-names ${isBoolPath ? myLocation.includes(`/${name.to}`) : myLocation.endsWith(`/${name.to}`) ? "choosen" : ""}`} to={name.to}>
                    {name.name}
                  </Link>
                </div>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
