const UpdateGame = async (game) => {
  const { GameCode } = game;
  try {
    const response = await fetch(
      `http://localhost:5000/gamesListRoutes/${GameCode}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Update successful:", data);
    return data; // Return the response object
  } catch (error) {
    console.error("Error updating game:", error);
    return null; // Return null in case of an error
  }
};
export default UpdateGame;
