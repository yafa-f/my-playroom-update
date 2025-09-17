import { path } from "../../utils/server";

const deleteGame = async (row) => {
  const { _id } = row;

  const userChoice = window.confirm(
    `Are you sure you want to delete: ${JSON.stringify(row)}?`
  );

  if (!userChoice) {
    console.log("Deletion canceled!");
    return false; // החזרה מפורשת שבוטל
  }

  try {
    const response = await fetch(`${path}gamesListRoutes/${_id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Game deleted:", data);
      return true; // הצלחה
    }
  } catch (error) {
    console.error(error);
  }

  return false; // לא הצליח
};

export default deleteGame;
