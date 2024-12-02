import React from "react";
import "./closetList.css";
import { useSelector } from "react-redux";
export const ClosetList = () => {
  const closets = useSelector((state) => state.closet.closets);

  return (
    <div className="closets">
      <div className="close-title">
        <div className="close-logo"></div>
        <div className="titleClose">ארונות</div>
      </div>
      <div className="table-title">
        <div className="tt-h3">קוד ארון</div>
        <div className="tt-h3">תחום משחקים בארון</div>
        <div className="tt-h3">קיימים מקומות פנויים?</div>
        <div className="tt-h3">מיקום הארון</div>
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
  );
};
