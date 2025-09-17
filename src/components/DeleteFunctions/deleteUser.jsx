import { path } from "../../utils/server";

const deleteUser = async (row) => {
  const { _id } = row;

  const isConfirmed = window.confirm(
    `Are you sure you want to delete: ${JSON.stringify(row)}?`
  );

  if (!isConfirmed) {
    console.log("Deletion user canceled!");
    return false; // מחזיר False כדי לסמן ביטול
  }

  try {
    const response = await fetch(`${path}userRoutes/${_id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User deleted:", data);
      return true; // הצלחה
    }
  } catch (error) {
    console.error(error);
  }

  return false; // אם לא הצליח
};

export default deleteUser;
