import React from "react";
import "./FinesList.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
export const FinesList = () => {
  const fines = useSelector((state) => state.fine.fines);
const addPartFine=()=>{
}
  return (
    <div className="fines">
      <div className="fines-title">
        <div className="fine-logo"></div>
        <div className="titleFine">קנסות עבור חלקים חסרים</div>
        <div className="add-fine-icon">
          {" "}
          <FontAwesomeIcon
            icon={faPlusCircle}
            color="rgba(255, 255, 255, 1) "
            size="2x"
            style={{borderRadius:"150px" ,border:" rgba(6, 120, 252, 1) solid"}}
           onClick={addPartFine}
          />
        </div>
      </div>

      <div className="table-title">
        <div className="h-3-fine">קוד קנס</div>
        <div className="h-3-fine">סוג החלק</div>
        <div className="h-3-fine">מחיר הקנס</div>
      </div>
      <div className="fines-table">
        <section className="section">
          {Array.isArray(fines) &&
            fines.map((item, i) => {
              return (
                <div className="one-item" key={i}>
                  <div className="fine-code">{item.FineCode}</div>
                  <div className="type-part-of-game">{item.Type}</div>
                  <div className="fine-price">{item.PriceOfFine}</div>
                </div>
              );
            })}
        </section>
      </div>
    </div>
  );
};
