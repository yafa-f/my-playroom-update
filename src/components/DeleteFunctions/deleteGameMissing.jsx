import { path } from "../../utils/server";

const deleteGameMissing = async (row) => {

  const { _id } = row;
  const isConfirmed = window.confirm(
    `Are you sure you want to delete: ${JSON.stringify(row)}?`
  );
  if (isConfirmed) {
    try {
      const response = await fetch(
        `${path}gamesWithMissingPartsRoutes/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const data = await response.json();
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Deletion gameMiss canceled!");
  }
};

export default deleteGameMissing;
