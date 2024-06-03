import logo from "./logo.svg";
import "./App.css";
import { User } from "./components/user";
import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { fetchGetClosets, fetchGetFines, fetchGetFinesForMissingParts, fetchGetForAges, fetchGetGames, fetchGetTypesGames, fetchGetUsers } from "./utils/server";
import { setUsers } from "./app/slices/usersSlice";
import { setGames } from "./app/slices/gameSlice";
import { Game } from "./components/game";
import { setClosets } from "./app/slices/closetSlice";
import { Closet } from "./components/closet";
import { setFines } from "./app/slices/fineSlice";
import { Fine } from "./components/fine";
import { setFinesForMissingParts } from "./app/slices/finesForMissingPartsSlice";
import { FinesForMissingParts } from "./components/finesForMissingParts";
// import { setAges } from "./app/slices/forAgeSlice";
// import { ForAge } from "./components/forAge";
import { setTypesGames } from "./app/slices/typeGameSlice";
import { TypeGame } from "./components/typeGame";
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { BaseScreen } from './components/BaseScreen';

function App() {
  // const [allUsers, setAllUsers] = useState([]);
  // const [allGames, setAllGames] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
      
        const response = await fetchGetUsers();
        dispatch(setUsers(response));
      } catch (error) {
        console.error(error);
      }
    };
    const fetchGames = async () => {
      try {
       
        const response = await fetchGetGames();
        dispatch(setGames(response));
      } catch (error) {
        console.error(error);
      }
    };
    const fetchClosets = async () => {
      try {
        const response = await fetchGetClosets();
        dispatch(setClosets(response));
      } catch (error) {
        console.error(error);
      }
    };
    const fetchFines = async () => {
      try {
        const response = await fetchGetFines();
        dispatch(setFines(response));
      } catch (error) {
        console.error(error);
      }
    };
    const fetchFinesForMissingParts = async () => {
      try {
        const response = await fetchGetFinesForMissingParts();
        dispatch(setFinesForMissingParts(response));
      } catch (error) {
        console.error(error);
      }
    };
    const fetchTypesOfGames = async () => {
      try {
        const response = await fetchGetTypesGames();
        dispatch(setTypesGames(response));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
    fetchGames();
    fetchClosets();
    fetchFines();
    fetchFinesForMissingParts();
    // fetchAges();
    fetchTypesOfGames();
  }, []);

  return (
   
    <BrowserRouter>
      <BaseScreen/>  
  </BrowserRouter>
  );
}

export default App;
