import React from "react";
import { Routes, Route } from "react-router-dom";
import { NewUser } from "../components/AddFunctions/NewUser/NewUser.jsx";
import { GamesList } from "../components/GamesList/GamesList.jsx";
import { List } from "../components/GenericLists/genericLists.jsx";
import { NewGame } from "../components/NewGame/NewGame.jsx";
import { SideBar } from "../components/SideBar/SideBar.jsx";
import { TakeList } from "../components/TakeList/TakeList.jsx";
import { ClosetList } from "../components/ClosetsList/ClosetList.jsx";
import { UsersList } from "../components/UsersList/usersList";
import { TypeOfGameList } from "../components/TypeOfGameList/TypeOfGameList.jsx";
import { FinesList } from "../components/FinesList/FinesList.jsx";
import { UserScreen } from "../components/UserScreen/userScreen";
import { EditUserScreen } from "../components/UserScreen/edit-user-screen";
import { HomePage } from "../components/HomePage/homePage";

export const Routing = () => {
  return (
    <div style={{ display: "revert" }}>
      <Routes>
        <Route path="/NewUser" element={<NewUser />}></Route>
        <Route path="/GamesList" element={<GamesList />}></Route>
        <Route path="/UsersList" element={<List />}></Route>
        <Route
          path="/GamesList/NewGame/bool/:bool"
          element={<NewGame />}
        ></Route>
        <Route path="/UsersList/singleUser" element={<UserScreen />}></Route>
        <Route path="/UsersList/editUser" element={<EditUserScreen />}></Route>
        <Route path="/SideBar" element={<SideBar />}></Route>
        <Route path="/TakeList" element={<TakeList />}></Route>
        <Route path="/ClosetsList" element={<ClosetList />}></Route>
        <Route path="/GameTopicList" element={<TypeOfGameList />}></Route>
        <Route path="/FinesList" element={<FinesList />}></Route>
      </Routes>
    </div>
  );
};
