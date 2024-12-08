import React from "react";
const path='https://server-jnz9.onrender.com/'
export const fetchGetUsers = () => {
  // return fetch("http://localhost:5000/userRoutes")
  // return fetch(`${path}userRoutes`)
  return fetch("https://server-jnz9.onrender.com/userRoutes")

    .then((data) => {
      console.log("data ", data);
      if (data.ok) {
        return data.json().then((user) => {
          return user;
        });
      } else alert("not defined");
    })
    .catch((e) => {
      return null;
    });
};

export const fetchGetGames = () => {
  // return fetch("http://localhost:5000/gamesListRoutes")
  return fetch(`${path}gamesListRoutes`)

    .then((data) => {
      console.log("data ", data);
      if (data.ok) {
        return data.json().then((game) => {
          return game;
        });
      } else alert("not defined");
    })
    .catch((e) => {
      return null;
    });
};
export const fetchGetFines = () => {
  // return fetch("http://localhost:5000/finesRoutes")
  return fetch(`${path}finesRoutes`)

    .then((data) => {
      console.log("data ", data);
      if (data.ok) {
        return data.json().then((fine) => {
          return fine;
        });
      } else alert("not defined");
    })
    .catch((e) => {
      return null;
    });
};
export const fetchGetTypesGames = () => {
  // return fetch("http://localhost:5000/tipesOfGamesRoutes")
  return fetch(`${path}tipesOfGamesRoutes`)

    .then((data) => {
      console.log("data ", data);
      if (data.ok) {
        return data.json().then((type) => {
          return type;
        });
      } else alert("not defined");
    })
    .catch((e) => {
      return null;
    });
};
export const fetchGetTakingOrReturning = () => {
  // return fetch("http://localhost:5000/takingOrReturningRoutes")
  return fetch(`${path}takingOrReturningRoutes`)

    .then((data) => {
      console.log("data ", data);
      if (data.ok) {
        return data.json().then((TOR) => {
          return TOR;
        });
      } else alert("not defined");
    })
    .catch((e) => {
      return null;
    });
};
export const fetchGetClosets = () => {
  // return fetch("http://localhost:5000/closetsRoutes")
  return fetch(`${path}closetsRoutes`)

    .then((data) => {
      console.log("data ", data);
      if (data.ok) {
        return data.json().then((closet) => {
          return closet;
        });
      } else alert("not defined");
    })
    .catch((e) => {
      return null;
    });
};
export const fetchGetForAges = () => {
  // return fetch("http://localhost:5000/forAgesRoutes")
  return fetch(`${path}forAgesRoutes`)

    .then((data) => {
      console.log("data ", data);
      if (data.ok) {
        return data.json().then((forAge) => {
          return forAge;
        });
      } else alert("not defined");
    })
    .catch((e) => {
      return null;
    });
};
export const fetchGetFinesForMissingParts = () => {
  // return fetch("http://localhost:5000/finesForMissingPartsRoutes")
  return fetch(`${path}finesForMissingPartsRoutes`)

    .then((data) => {
      console.log("data ", data);
      if (data.ok) {
        return data.json().then((missing) => {
          return missing;
        });
      } else alert("not defined");
    })
    .catch((e) => {
      return null;
    });
};
export const fetchGetGamesWithMissingParts = () => {
  // return fetch("http://localhost:5000/gamesWithMissingPartsRoutes")
  return fetch(`${path}gamesWithMissingPartsRoutes`)

    .then((data) => {
      console.log("data ", data);
      if (data.ok) {
        return data.json().then((gamesWiteMissing) => {
          return gamesWiteMissing;
        });
      } else alert("not defined");
    })
    .catch((e) => {
      return null;
    });
};
