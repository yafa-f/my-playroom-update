import React from "react";
import { Routes, Route } from "react-router-dom";
import { NewUser } from "../components/AddFunctions/NewUser/newUser";
import { GamesList } from "../components/GamesList/gamesList";
import { GameBack } from "../components/GameBack/gameBack";
import { NewCloset } from "../components/AddFunctions/NewCloset/newCloset";
import{ UsersList }from "../components/UsersList/usersList";
import { NewGame, AddParts } from "../components/NewGame/newGame.jsx";
import { SideBar } from "../components/SideBar/sideBar.jsx";

export const Routing = () => {
  return (
    <div style={{ display: "revert" }}>
      <Routes>
        <Route path="/NewUser" element={<NewUser />}></Route>
        <Route path="/GameBack" element={<GameBack />}></Route>
        <Route path="/GamesList" element={<GamesList />}></Route>
        <Route path="/List" element={<UsersList />}></Route>
        <Route path="/NewGame" element={<NewGame />}></Route>
        <Route path="/AddParts" element={<AddParts />}></Route>
        <Route path="/SideBar" element={<SideBar />}></Route>
      </Routes>
    </div>
  );
};
