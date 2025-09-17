import { path } from "../../utils/server";

const NewDebtFunction = async (debt) => {
  try {
    const response = await fetch(`${path}debtsRoutes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(debt),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Debt added successfully:", data);
    return data; 
  } catch (error) {
    console.error("Error adding debt:", error);
    return null;
  }
};

export default NewDebtFunction;

