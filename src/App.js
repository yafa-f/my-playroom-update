// import "./App.css";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import {
//   fetchGetClosets,
//   fetchGetFines,
//   // fetchGetDebts,
//   fetchGetFinesForMissingParts,
//   fetchGetForAges,
//   fetchGetGames,
//   fetchGetTakingOrReturning,
//   fetchGetTypesGames,
//   fetchGetUsers,
//   fetchGetGamesWithMissingParts,
//   fetchGetGameSkills,
//   fetchGetActuliGame,
// } from "./utils/server";
// import { BrowserRouter } from "react-router-dom";
// import { setUsers } from "./app/slices/usersSlice";
// import { setGames } from "./app/slices/gameSlice";
// import { setClosets } from "./app/slices/closetSlice";
// import { setFines } from "./app/slices/fineSlice";
// import { setFinesForMissingParts } from "./app/slices/finesForMissingPartsSlice";
// import { setTypesGames } from "./app/slices/typeGameSlice";
// import { setTakingOrReturning } from "./app/slices/takeOrReturnSlice";
// import { setForAges } from "./app/slices/forAgeSlice";
// import { BaseScreen } from "./components/BaseScreen";
// import { setGamesWithMissingParts } from "./app/slices/gamesWiteMissingPartsSlice";
// import { setDebts } from "./app/slices/debtSlice";
// import {setGameSkills} from "./app/slices/gameSkillsSlice";
// import {setActualiGames} from "./app/slices/actuliGameSlice"
// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetchGetUsers();
//         dispatch(setUsers(response));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     const fetchGames = async () => {
//       try {
//         const response = await fetchGetGames();
//         console.log("response from server:", response);

//         dispatch(setGames(response));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     const fetchClosets = async () => {
//       try {
//         const response = await fetchGetClosets();
//         dispatch(setClosets(response));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     const fetchFines = async () => {
//       try {
//         const response = await fetchGetFines();
//         dispatch(setFines(response));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     const fetchDebts = async () => {
//       try {
//         // const response = await fetchGetDebts();
//         // dispatch(setDebts(response));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     const fetchFinesForMissingParts = async () => {
//       try {
//         const response = await fetchGetFinesForMissingParts();
//         dispatch(setFinesForMissingParts(response));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     const fetchTypesOfGames = async () => {
//       try {
//         const response = await fetchGetTypesGames();
//         dispatch(setTypesGames(response));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     const fetchActuliGame = async () => {
//       try {
//         const response = await fetchGetActuliGame();
//         console.log("fetchActuliGame resp", response);
//         dispatch(setActualiGames(response)); // ⬅️ שים לב לרבים
//       } catch (error) {
//         console.error(error);
//       }
//     };
    
//     const fetchGameSkills = async () => {
//       try {
//         const response = await fetchGetGameSkills();
//         console.log("fetchGameSkills resp", response);
//         dispatch(setGameSkills(response)); // ⬅️ שים לב לרבים
//       } catch (error) {
//         console.error(error);
//       }
//     };
    
//     const fetchTakingOrReturning = async () => {
//       try {
//         const response = await fetchGetTakingOrReturning();
//         console.log("fetchTakingOrReturning re",response);
//         dispatch(setTakingOrReturning(response));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     const fetchForAges = async () => {
//       try {
//         const response = await fetchGetForAges();
//         console.log("response from server ages:", response);

//         dispatch(setForAges(response));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     const fetchGamesWithMissingParts = async () => {
//       try {
//         const response = await fetchGetGamesWithMissingParts();
//         dispatch(setGamesWithMissingParts(response));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchUsers();
//     fetchGames();
//     fetchClosets();
//     // fetchFines();
//     // fetchDebts();
//     // fetchFinesForMissingParts();
//     fetchTypesOfGames();
//     fetchTakingOrReturning();
//     fetchForAges();
//     fetchGameSkills();
//     fetchActuliGame();
//     fetchGamesWithMissingParts();
//   }, []);

//   return (
//     <BrowserRouter>
//       <BaseScreen />
//     </BrowserRouter>
//   );
// }

// export default App;
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
  fetchGetGameSkills,
  fetchGetActuliGame,
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
import { setGamesWithMissingParts } from "./app/slices/gamesWiteMissingPartsSlice";
import { setDebts } from "./app/slices/debtSlice";
import { setGameSkills } from "./app/slices/gameSkillsSlice";
import { setActualiGames } from "./app/slices/actuliGameSlice";

// 👇 מוסיפים את ה-hook שלך
import { useCity } from "../src/components/Login/LoginContext.jsx";
import { Routing } from "./utils/routing.jsx";

function App() {
  const dispatch = useDispatch();
  const { cityCode } = useCity(); // נלקח מה־Context במקום localStorage ישירות

  useEffect(() => {
    const filterIfHasCity = (data) => {
      if (!Array.isArray(data)) return data;
      if (data.length > 0 && "cityCode" in data[0] && cityCode) {
        return data.filter((item) => item.cityCode === cityCode);
      }
      return data;
    };

    const fetchUsers = async () => {
      try {
        const response = await fetchGetUsers();
        dispatch(setUsers(filterIfHasCity(response)));
      } catch (error) {
        console.error(error);
      }
    };
    const fetchGames = async () => {
      try {
        const response = await fetchGetGames();
        dispatch(setGames(filterIfHasCity(response)));
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
    const fetchTypesOfGames = async () => {
      try {
        const response = await fetchGetTypesGames();
        dispatch(setTypesGames(response));
      } catch (error) {
        console.error(error);
      }
    };
    const fetchActuliGame = async () => {
      try {
        const response = await fetchGetActuliGame();
        dispatch(setActualiGames(response));
      } catch (error) {
        console.error(error);
      }
    };
    const fetchGameSkills = async () => {
      try {
        const response = await fetchGetGameSkills();
        dispatch(setGameSkills(response));
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

    // קריאות בפועל
    fetchUsers();
    fetchGames();
    fetchClosets();
    fetchTypesOfGames();
    fetchTakingOrReturning();
    fetchForAges();
    fetchGameSkills();
    fetchActuliGame();
    fetchGamesWithMissingParts();
  }, [dispatch, cityCode]); // 👈 עכשיו כל פעם שהעיר משתנה – ה־useEffect ירוץ שוב

  return (
    <BrowserRouter>
      <Routing/>
    </BrowserRouter>
  );
}

export default App;
