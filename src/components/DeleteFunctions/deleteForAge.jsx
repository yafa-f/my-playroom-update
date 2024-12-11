import { path } from "../../utils/server";

const deleteForAge = async (row) => {
  const { _id } = row;
  const isConfirmed = window.confirm(
    `Are you sure you want to delete: ${JSON.stringify(row)}?`
  );
  if (isConfirmed) {
    try {
      const response = await fetch(`${path}forAgesRoutes/${_id}`, {
        method: "DELETE",
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Deletion forAges canceled!");
  }
};

export default deleteForAge;
