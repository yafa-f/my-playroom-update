// CityContext.js
import React, { createContext, useState, useContext } from "react";

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [cityCode, setCityCode] = useState(
    () => localStorage.getItem("cityCode") || ""
  );

  const saveCityCode = (code) => {
    setCityCode(code);
    localStorage.setItem("cityCode", code);
  };

  return (
    <CityContext.Provider value={{ cityCode, saveCityCode }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);
