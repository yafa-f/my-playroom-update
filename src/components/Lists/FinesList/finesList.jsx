import React from "react";
import "./finesList.css";
import { useSelector } from "react-redux";

export const FinesList = () => {
  const fines = useSelector((state) => state.fine.fines);

  return (
    <div className="fines">
      <div className="fines-title">
        <div className="fine-logo"></div>
        <div className="titleFine">קנסות עבור חלקים חסרים</div>
      </div>

      <div className="table-title">
        <div className="h-3-fine">קוד קנס</div>
        <div className="h-3-fine">סוג החלק</div>
        <div className="h-3-fine">מחיר הקנס</div>
      </div>

      <div className="fines-table">
        <section className="section">
          {Array.isArray(fines) &&
            fines.map((item, i) => (
              <div className="one-item" key={i}>
                <div className="fine-code">{item.FineCode}</div>
                <div className="type-part-of-game">{item.Type}</div>
                <div className="fine-price">{item.PriceOfFine}</div>
              </div>
            ))}
        </section>
      </div>
    </div>
  );
};