import React from "react";
import "./ClosetList.css";
import { useSelector } from "react-redux";
export const ClosetList = () => {
  const closets = useSelector((state) => state.closet.closets);
  const CloseLogo = () => (
    <svg
      width="65"
      height="65"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group">
        <path
          id="Vector"
          d="M20.41 8.53549L15.58 3.70549C15.21 3.33549 14.7 3.12549 14.17 3.12549H5C3.9 3.12549 3 4.02549 3 5.12549V19.1255C3 20.2255 3.9 21.1255 5 21.1255H19C20.1 21.1255 21 20.2255 21 19.1255V9.95549C21 9.42549 20.79 8.91549 20.41 8.53549ZM7 7.12549H14V9.12549H7V7.12549ZM17 17.1255H7V15.1255H17V17.1255ZM17 13.1255H7V11.1255H17V13.1255Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
  return (
    <div>
      <div className="closets">
        <div className="close-title">
          <div style={{ color: "rgba(6, 120, 252, 1)", marginTop: "10px" }}>
            <CloseLogo />
          </div>
          <div className="titleClose">ארונות</div>
        </div>
        <div className="table-title">
          <h3>קוד ארון</h3>
          <h3>תחום משחקים בארון</h3>
          <h3>קיימים מקומות פנויים?</h3>
          <h3>מיקום הארון</h3>
        </div>
        <div className="closet-table">
          <section className="section">
            {Array.isArray(closets) &&
              closets.map((item, i) => {
                return (
                  <div className="one-item" key={i}>
                    <div className="close-code">{item.closetCode}</div>
                    <div className="type-game-in-closet">{item.closetType}</div>
                    <div className="is-empty-place">
                      {item.emptyPlace.length > 0 ? "כן" : "לא"}
                    </div>
                    <div className="position-of-closet">
                      {item.closetLocation}
                    </div>
                  </div>
                );
              })}
          </section>
        </div>
      </div>
    </div>
  );
};
