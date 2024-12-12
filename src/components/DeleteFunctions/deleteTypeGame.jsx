import { path } from "../../utils/server";

const deleteTypeGame = async (row) => {
  const { _id } = row;
  const isConfirmed = window.confirm(
    `Are you sure you want to delete: ${JSON.stringify(row)}?`
  );
  if (isConfirmed) {
    try {
      const response = await fetch(`${path}tipesOfGamesRoutes/${_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Deletion typeGame canceled!");
  }
};

export default deleteTypeGame;
