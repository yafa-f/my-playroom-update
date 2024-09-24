import React from "react";

const DeleteGame = async (game) => {

  const { _id,GameName } = game;
  const isConfirmed = window.confirm(
    `האם את בטוחה שברצונך למחוק את המשחק : ${GameName}?`
  );
  if (isConfirmed) {
    try {
 
      const response = await fetch(`http://localhost:5000/gamesListRoutes/${_id}`, {
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

export default DeleteGame;
