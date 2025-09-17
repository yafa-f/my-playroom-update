import { path } from "../../utils/server";

const NewTakeFunction = async (take) => {
  try {
    const response = await fetch(`${path}takingOrReturningRoutes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(take),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("add take successful:", data);
    return response; 
  } catch (error) {
    console.error("Error adding take:", error);
    return null;
  }
};
export default NewTakeFunction;

