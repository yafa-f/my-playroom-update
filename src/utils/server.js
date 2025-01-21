export const path = "https://server-jnz9.onrender.com/";

const fetchData = (route) => {
  return fetch(`${path}${route}`)
    .then((response) => {
      console.log("data ", response);
      if (response.ok) {
        return response.json();
      } else {
        alert("not defined");
        return null;
      }
    })
    .catch((e) => {
      console.error("Error fetching data: ", e);
      return null;
    });
};

export const fetchGetUsers = () => fetchData("userRoutes");
export const fetchGetGames = () => fetchData("gamesListRoutes");
export const fetchGetFines = () => fetchData("finesRoutes");
export const fetchGetTypesGames = () => fetchData("tipesOfGamesRoutes");
export const fetchGetTakingOrReturning = () =>
  fetchData("takingOrReturningRoutes");
export const fetchGetClosets = () => fetchData("closetsRoutes");
export const fetchGetForAges = () => fetchData("forAgesRoutes");
export const fetchGetFinesForMissingParts = () =>
  fetchData("finesForMissingPartsRoutes");
export const fetchGetGamesWithMissingParts = () =>
  fetchData("gamesWithMissingPartsRoutes");
