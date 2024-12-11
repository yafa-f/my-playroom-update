import { path } from "../../utils/server";

const UpdateGameWithMissPart = async (game) => {
  const { Id } = game;
  try {
    const response = await fetch(`${path}gamesWithMissingPartsRoutes/${Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Update gamesWithMissingPart successful:", data);
    return data; // Return the response object
  } catch (error) {
    console.error("Error updating gamesWithMissingPart:", error);
    return null; // Return null in case of an error
  }
};
export default UpdateGameWithMissPart;
