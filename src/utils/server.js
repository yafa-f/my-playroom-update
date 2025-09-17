// export const path = "https://server-jnz9.onrender.com/";
export const path = "http://localhost:5001/";

export const fetchData = (route) => {
  return fetch(`${path}${route}`)
    .then((response) => {
      console.log("data ", route, response);
      if (response.ok) {
        return response.json();
      } else {
        alert("not defined");
        return null;
      }
    })
    .then((data) => {
      if (!data) return [];
    
      // אם יש שדה data בפנים
      if (typeof data === "object" && "data" in data) {
        return Array.isArray(data.data) ? data.data : [data.data];
      }
    
      // אם data עצמו מערך
      if (Array.isArray(data)) {
        return data;
      }
    
      // כל מקרה אחר – הפוך אותו למערך
      return [data];
    })
    .catch((e) => {
      console.error("Error fetching data: ", route, e);
      return null;
    });
};

export const fetchGetUsers = () => fetchData("userRoutes");
export const fetchGetGames = () => fetchData("gamesListRoutes");
export const fetchGetFines = () => fetchData("finesRoutes");
export const fetchGetTypesGames = () => fetchData("gameTypeRoutes");
export const fetchGetGameSkills = () => fetchData("gameSkillsRoutes");
export const fetchGetActuliGame = () => fetchData("actuliGameRoutes");
export const fetchGetTakingOrReturning = () =>
  fetchData("takingOrReturningRoutes");
export const fetchGetClosets = () => fetchData("closetsRoutes");
export const fetchGetForAges = () => fetchData("agesRoutes");
export const fetchGetFinesForMissingParts = () =>
  fetchData("finesForMissingPartsRoutes");
export const fetchGetGamesWithMissingParts = () =>
  fetchData("gamesWithMissingPartsRoutes");
