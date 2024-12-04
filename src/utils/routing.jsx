import React from "react";
import { Routes, Route } from "react-router-dom";
import { GamesList } from "../components/Lists/GamesList/gamesList.jsx";
import { NewGame } from "../components/AddFolders/NewGame/newGame.jsx";
import { SideBar } from "../components/SideBar/sideBar.jsx";
import { TakeList } from "../components/Lists/TakeList/takeList.jsx";
import { ClosetList } from "../components/Lists/ClosetsList/closetList.jsx";
import { UsersList } from "../components/Lists/UsersList/usersList.jsx";
import { TypeOfGameList } from "../components/Lists/TypeOfGameList/typeOfGameList.jsx";
import { FinesList } from "../components/Lists/FinesList/finesList.jsx";
import { ViewSingleUser } from "../components/UserScreen/view-single-user.jsx";
import { ViewEditAddUser } from "../components/UserScreen/view-edit-add-user.jsx";
import { Taking_Returning } from "../components/Taking_Returning/Taking_Returning.jsx";
import { TakingHistory } from "../components/TakingHistory/TakingHistory.jsx";
import { AddTake } from "../components/AddFolders/NewTake/newTake.jsx";
import { AgesList } from "../components/Lists/AgesList/agesList.jsx";
import { GamesWithMissingPartsList } from "../components/Lists/GamesWithMissingPartsList/gamesWithMissingParts.jsx";
export const Routing = () => {
  return (
    <div style={{ display: "revert" }}>
      <Routes>
        <Route path="/GamesList" element={<GamesList />}></Route>
        <Route path="/UsersList" element={<UsersList />}></Route>
        <Route path="/UsersList/newUser" element={<ViewEditAddUser />}></Route>
        <Route
          path="/GamesList/NewGame/bool/:bool"
          element={<NewGame />}
        ></Route>
        <Route path="/singleUser" element={<ViewSingleUser />}></Route>
        <Route
          path="/singleUser/editUser"
          element={<ViewEditAddUser />}
        ></Route>
        <Route path="/SideBar" element={<SideBar />}></Route>
        <Route path="/addTake" element={<AddTake />}></Route>
        <Route path="/TakeList" element={<TakeList />}></Route>
        <Route path="/ClosetsList" element={<ClosetList />}></Route>
        <Route path="/GameTopicList" element={<TypeOfGameList />}></Route>
        <Route path="/AgesList" element={<AgesList />}></Route>
        <Route path="/FinesList" element={<FinesList />}></Route>
        <Route path="/GamesWithMissingPartsList" element={<GamesWithMissingPartsList />}></Route>
        <Route
          path="/singleUser/Taking_Returning"
          element={<Taking_Returning />}
        ></Route>
        <Route
          path="/singleUser/TakingHistory"
          element={<TakingHistory />}
        ></Route>
      </Routes>
    </div>
  );
};
