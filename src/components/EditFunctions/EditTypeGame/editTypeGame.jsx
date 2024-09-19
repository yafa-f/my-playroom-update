
export const editTypeGame=async(row)=>{
    const { _id } = row;
    const response = await fetch(`http://localhost:5000/tipesOfGamesRoutes/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify(row),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("type game updated successfully:", data);
      } else {
        console.error("Failed to update type game.");
      }
  
  }
  