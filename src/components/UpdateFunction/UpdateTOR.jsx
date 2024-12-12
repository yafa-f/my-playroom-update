import { path } from "../../utils/server";

const UpdateTOR = async (take) => {
  const { ReturnID } = take;

  try {
    const response = await fetch(`${path}takingOrReturningRoutes/${ReturnID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(take),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details:", errorData);

      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Update takingOrReturning successful:", data);
    return data; // Return the response object
  } catch (error) {
    console.error("Error updating takingOrReturning:", error);
    return null; // Return null in case of an error
  }
};
export default UpdateTOR;
