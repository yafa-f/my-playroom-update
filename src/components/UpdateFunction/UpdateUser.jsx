
import { path } from "../../utils/server";

const UpdateUser = async (user) => {
  const { userCode } = user;
  try {
    const response = await fetch(`${path}userRoutes/${userCode}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details:", errorData);
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Update user successful:", data);
    return data; // Return the response object
  } catch (error) {
    console.error("Error updating user:", error);
    return null; // Return null in case of an error
  }
};

export default UpdateUser;
