const NewUserFunction = async (user) => {
  try {
    const response = await fetch("http://localhost:5000/userRoutes", {
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
    console.log("add successful:", userData);
    return userData; // Return the response object
  } catch (error) {
    console.error("Error adding game:", error);
    return null; // Return null in case of an error
  }
};
  export default NewUserFunction;

