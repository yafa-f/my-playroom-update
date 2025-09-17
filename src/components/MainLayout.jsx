import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HomePage } from "../components/HomePage/homePage.jsx";

export const MainLayout = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/addTake";

  return (
    <div style={{ position: "relative" }}>
      {!hideSidebar && (
        <div>
          <HomePage />
          <div
            style={{
              position: "absolute",
              top: "20vh",
              width: "70vw",
              height: "30vh",
            }}
          >
            <Outlet />
          </div>
        </div>
      )}
      {hideSidebar && <Outlet />}
    </div>
  );
};
