import React from 'react'
import './agesList.css'
import { useSelector } from "react-redux";

export const AgesList=()=> {
  const ages = useSelector((state) => state.forAge.forAges).data;
  return (
    <div className="ages">
    <div className="ages-title">
      <div className="age-logo"></div>
      <div className="titleAge">טווח גילאים</div>
    </div>
    <div className="table-title">
      <div className="h-3-age">קוד גיל</div>
      <div className="h-3-age">מיועד לגילאי</div>
    </div>
    <div className="ages-table">
      <section className="section">
        {Array.isArray(ages) &&
          ages.map((item, i) => {
            return (
              <div className="one-item-age" key={i}>
                <div className="age-code">{item.AgeCode}</div>
                <div className="for-ages">{item.Age}</div>
              </div>
            );
          })}
      </section>
    </div>
  </div>
  )
}
