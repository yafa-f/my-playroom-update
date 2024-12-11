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
      console.log("add gameWithMiss successful:", data);
      return response; // Return the response object
    } catch (error) {
      console.error("Error adding gameWithMiss:", error);
      return null; // Return null in case of an error
    }
  };
  export default NewGameWithMissPartFunction;
  