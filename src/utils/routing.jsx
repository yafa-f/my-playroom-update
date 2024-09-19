import React from "react";
import { Routes, Route } from "react-router-dom";
import { NewUser } from "../components/AddFunctions/NewUser/newUser";
import { NewGame } from "../components/NewGame/newGame";
import { GamesList } from "../components/GamesList/gamesList";
import { GameBack } from "../components/GameBack/gameBack";
import { HomePage } from "../components/HomePage/homePage";
// import { List } from "../components/GenericLists/genericLists.jsx";
import { NewCloset } from "../components/AddFunctions/NewCloset/newCloset";
import{ UsersList }from "../components/UsersList/usersList"
export const Routing = () => {
  return (
    <div style={{display:'revert'}}>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/NewUser" element={<NewUser/>}></Route>
        <Route path="/NewGame" element={<NewGame/>}></Route>
        <Route path="/GameBack" element={<GameBack/>}></Route>
        <Route path="/GamesList" element={<GamesList/>}></Route>
        <Route path="/List" element={<UsersList/>}></Route>
      </Routes>
    </div>
  );
};
