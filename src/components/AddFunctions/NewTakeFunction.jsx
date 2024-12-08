
const NewTakeFunction = async (take) => {
  const path='https://server-jnz9.onrender.com/'

    try {
      // const response = await fetch("http://localhost:5000/takingOrReturningRoutes", {
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
      console.log("add successful:", data);
      return response; // Return the response object
    } catch (error) {
      console.error("Error adding game:", error);
      return null; // Return null in case of an error
    }
  };
  export default NewTakeFunction;
  