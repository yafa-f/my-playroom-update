import React from "react";
import { Routes, Route } from "react-router-dom";
import { NewUser } from "../components/AddFunctions/NewUser/newUser.jsx";
import { GamesList } from "../components/GamesList/gamesList.jsx";
import { List } from "../components/GenericLists/genericLists.jsx";
import { NewGame } from "../components/NewGame/newGame.jsx";
import { SideBar } from "../components/SideBar/sideBar.jsx";
import { TakeList } from "../components/TakeList/TakeList.jsx";
import { ClosetList } from "../components/ClosetsList/ClosetList.jsx";
import { UsersList } from "../components/UsersList/usersList";
import { TypeOfGameList } from "../components/TypeOfGameList/TypeOfGameList.jsx";
import { FinesList } from "../components/FinesList/FinesList.jsx";
import { UserScreen } from "../components/UserScreen/userScreen";
import { ViewUserScreen } from "../components/UserScreen/user-view-screen.jsx";
import { HomePage } from "../components/HomePage/homePage";
import { Taking_Returning } from "../components/Taking_Returning/Taking_Returning.jsx";
import { TakingHistory } from "../components/TakingHistory/TakingHistory.jsx";
import { ReturnGame } from "../components/ReturnGame/ReturnGame.jsx";
import { AddTake } from "../components/AddTake/AddTake.jsx";
import { AgesList } from "../components/AgesList/AgesList.jsx";
export const Routing = () => {
  return (
    <div style={{ display: "revert" }}>
      <Routes>
        <Route path="/NewUser" element={<NewUser />}></Route>
        <Route path="/GamesList" element={<GamesList />}></Route>
        <Route path="/UsersList" element={<UsersList />}></Route>
        <Route path="/UsersList/newUser" element={<ViewUserScreen />}></Route>

        <Route
          path="/GamesList/NewGame/bool/:bool"
          element={<NewGame />}
        ></Route>
        <Route path="/singleUser" element={<UserScreen />}></Route>
        <Route path="/singleUser/editUser" element={<ViewUserScreen />}></Route>
        <Route path="/SideBar" element={<SideBar />}></Route>
        <Route path="/addTake" element={<AddTake />}></Route>
        <Route path="/TakeList" element={<TakeList />}></Route>
        <Route path="/ClosetsList" element={<ClosetList />}></Route>
        <Route path="/GameTopicList" element={<TypeOfGameList />}></Route>
        <Route path="/AgesList" element={<AgesList />}></Route>
        <Route path="/FinesList" element={<FinesList />}></Route>
        <Route path="/singleUser/Taking_Returning" element={<Taking_Returning />}>
        <Route path="returnGame" element={<ReturnGame />}/>
        </Route>
        <Route path="/singleUser/TakingHistory" element={<TakingHistory />}></Route>

      </Routes>
    </div>
  );
};
