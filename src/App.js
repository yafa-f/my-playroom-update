import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchGetClosets,
  fetchGetFines,
  // fetchGetDebts,
  fetchGetFinesForMissingParts,
  fetchGetForAges,
  fetchGetGames,
  fetchGetTakingOrReturning,
  fetchGetTypesGames,
  fetchGetUsers,
  fetchGetGamesWithMissingParts,
} from "./utils/server";
import { BrowserRouter } from "react-router-dom";
import { setUsers } from "./app/slices/usersSlice";
import { setGames } from "./app/slices/gameSlice";
import { setClosets } from "./app/slices/closetSlice";
import { setFines } from "./app/slices/fineSlice";
import { setFinesForMissingParts } from "./app/slices/finesForMissingPartsSlice";
import { setTypesGames } from "./app/slices/typeGameSlice";
import { setTakingOrReturning } from "./app/slices/takeOrReturnSlice";
import { setForAges } from "./app/slices/forAgeSlice";
import { BaseScreen } from "./components/BaseScreen";
import { setGamesWithMissingParts } from "./app/slices/gamesWiteMissingPartsSlice";
import { setDebts } from "./app/slices/debtSlice";

function App() {
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
    const fetchDebts = async () => {
      try {
        // const response = await fetchGetDebts();
        // dispatch(setDebts(response));
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
    const fetchTakingOrReturning = async () => {
      try {
        const response = await fetchGetTakingOrReturning();
        dispatch(setTakingOrReturning(response));
      } catch (error) {
        console.error(error);
      }
    };
    const fetchForAges = async () => {
      try {
        const response = await fetchGetForAges();
        dispatch(setForAges(response));
      } catch (error) {
        console.error(error);
      }
    };
    const fetchGamesWithMissingParts = async () => {
      try {
        const response = await fetchGetGamesWithMissingParts();
        dispatch(setGamesWithMissingParts(response));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
    fetchGames();
    fetchClosets();
    fetchFines();
    fetchDebts();
    fetchFinesForMissingParts();
    fetchTypesOfGames();
    fetchTakingOrReturning();
    fetchForAges();
    fetchGamesWithMissingParts();
  }, []);

  return (
    <BrowserRouter>
      <BaseScreen />
    </BrowserRouter>
  );
}

export default App;
