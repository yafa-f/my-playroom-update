import { path } from "../../utils/server";

const NewUserFunction = async (user) => {
  try {
    const response = await fetch(`${path}userRoutes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const userData = await response.json();
    console.log("User added successfully:", userData);
    return userData; 
  } catch (error) {
    console.error("Error adding user:", error);
    return null; 
  }
};

export default NewUserFunction;

