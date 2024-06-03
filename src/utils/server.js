import React from "react";
export const fetchGetUsers = () => {
  return fetch("http://localhost:5000/userRoutes")
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
  return fetch("http://localhost:5000/gamesListRoutes")
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
  return fetch("http://localhost:5000/finesRoutes")
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
  return fetch("http://localhost:5000/tipesOfGamesRoutes")
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
  return fetch("http://localhost:5000/takingOrReturningRoutes")
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
  return fetch("http://localhost:5000/closetsRoutes")
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
  return fetch("http://localhost:5000/forAgesRoutes")
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
  return fetch("http://localhost:5000/finesForMissingPartsRoutes")
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
