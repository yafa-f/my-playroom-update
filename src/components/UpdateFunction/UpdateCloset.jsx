const UpdateCloset = async (id, updateLocation) => {
  try {
    const response = await fetch(`http://localhost:5000/closetsRoutes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        emptyPlace: updateLocation,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Update successful:", data);
    return data; // Return the response object
  } catch (error) {
    console.error("Error updating game:", error);
    return null; // Return null in case of an error
  }
};
export default UpdateCloset;
