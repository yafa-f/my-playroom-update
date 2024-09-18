import React from "react";
import "./gamesList.css";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { AccordionDetails, AccordionSummary, Accordion } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

export const GamesList = () => {
  
  const games = useSelector((state) => state.game.games);
  return (
    <div className="games">
      <div className="title">
        <div className="game-logo"></div>
        <div className="title-name">משחקים</div>
        <Button
          sx={{
            width: "150px",
            height: "38px",
            top: "20px",
            borderRadius: "28px",
          }}
          variant="contained"
        >
          + משחק
        </Button>
      </div>
      <div className="table-title">
        <h3>פרטי משחק</h3>
        <h3>סטטוס</h3>
        <h3>מיקום</h3>
        <h3>סטטוס השאלה</h3>
      </div>

      <div className="table">
        <section className="section">
          {games?.map((game, i) => (
            <div key={i}>
              <Accordion sx={{ direction: "rtl" }}>
                <AccordionSummary
                  sx={{ height: "15vh" }}
                  expandIcon={
                    <ExpandMoreIcon sx={{ color: "rgba(6, 120, 252, 1)" }} />
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div className="game-column">
                    <div className="game-details">
                      <div className="game-name">{game.GameName}</div>
                      <div className="game-name-second">
                        <div className="age">
                          <div className="child-logo"></div>
                          {game.AgeCode}
                        </div>
                        <div className="pas">|</div>
                        <div className="type">
                          <div className="tchum">תחום:</div>
                          <div>{game.GameTypeCode}</div>
                        </div>
                      </div>
                    </div>
                    <div className="game-status">{game.CurrentStateOfGame}</div>
                    <div className="place">
                      <div className="closet-logo"></div>
                      <div className="closet-number">{game.ClosetNumber}</div>
                      <div className="closet-place">{game.Location}</div>
                    </div>
                    <div className="game-mushal">
                      <div className="mushal-logo"></div>
                      <div className="mushal">מושאל</div>
                      {game.IsAvailable == false ? (
                        <div></div>
                      ) : (
                        <>
                          <div className="pas">|</div>
                          <div>רחלי פרידמן</div>
                        </>
                      )}
                    </div>
                    <div className="Complementar-Available">
                      {game.HaveComplementaryGame === "TRUE" ? (
                        <div></div>
                      ) : (
                        <div className="Complementar">
                          <div className="v-logo"></div>קיים משחק משלים
                        </div>
                      )}
                      {game.IsAvailable === "TRUE" ? (
                        <div></div>
                      ) : (
                        <div className="Available">
                          <div className="v-logo"></div>זמין להשאלה
                        </div>
                      )}
                    </div>
                    <div className="update-delete-icons">
                      <Link>
                        <div className="update-icon"></div>
                      </Link>
                      <Link>
                        <div className="delete-icon"></div>
                      </Link>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
