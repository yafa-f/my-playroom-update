import React from "react";

const deleteGameMissing = async (row) => {
  const path='https://server-jnz9.onrender.com/'

  const { _id } = row;
  const isConfirmed = window.confirm(
    `Are you sure you want to delete: ${JSON.stringify(row)}?`
  );
  if (isConfirmed) {
    try {
 
      // const response = await fetch(`http://localhost:5000/gamesWithMissingPartsRoutes/${_id}`, {
        const response = await fetch(`${path}gamesWithMissingPartsRoutes/${_id}`, {

        method: "DELETE",
      });
    
      if (response.ok) {
        const data = await response.json();
     
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Deletion canceled!");
  }
};

export default deleteGameMissing;
