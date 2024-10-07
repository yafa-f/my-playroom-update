import React from "react";
import { Routes, Route } from "react-router-dom";
import { NewUser } from "../components/AddFunctions/NewUser/newUser";
import { GamesList } from "../components/GamesList/gamesList";
import { GameBack } from "../components/GameBack/gameBack";
import { List } from "../components/GenericLists/genericLists.jsx";
import { NewGame } from "../components/NewGame/newGame.jsx";
import { SideBar } from "../components/SideBar/sideBar.jsx";
import { TakeList } from "../components/TakeList/TakeList.jsx";
import { ClosetList } from "../components/ClosetsList/ClosetList.jsx";
import { TypeOfGameList } from "../components/TypeOfGameList/TypeOfGameList.jsx";

export const Routing = () => {
  return (
    <div style={{ display: "revert" }}>
      <Routes>
        <Route path="/NewUser" element={<NewUser />}></Route>
        <Route path="/GameBack" element={<GameBack />}></Route>
        <Route path="/GamesList" element={<GamesList />}></Route>
        <Route path="/List" element={<List />}></Route>
        <Route
          path="/GamesList/NewGame/bool/:bool"
          element={<NewGame />}
        ></Route>
        <Route path="/SideBar" element={<SideBar />}></Route>
        <Route path="/TakeList" element={<TakeList />}></Route>
        <Route path="/ClosetsList" element={<ClosetList />}></Route>
        <Route path="/GameTopicList" element={<TypeOfGameList />}></Route>
      </Routes>
    </div>
  );
};
