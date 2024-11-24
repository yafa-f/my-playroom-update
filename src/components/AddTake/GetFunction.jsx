const GetFunction = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/gamesListRoutes/single/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Game retrieved successfully:", data);
      return data; // Return the game data
    } catch (error) {
      console.error("Error fetching game:", error);
      return null; // Return null in case of an error
    }
  };
  
  export default GetFunction;