import { path } from "../../utils/server";

const NewGameWithMissPartFunction = async (game) => {
  try {
    const response = await fetch(`${path}gamesWithMissingPartsRoutes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Game with missing parts added successfully:", data);
    return data;
  } catch (error) {
    console.error("Error adding game with missing parts:", error);
    return null; 
  }
};

export default NewGameWithMissPartFunction;
