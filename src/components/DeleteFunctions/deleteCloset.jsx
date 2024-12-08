import React from "react";

const deleteCloset = async (row) => {
  const { _id } = row;
  const path='https://server-jnz9.onrender.com/'

  const isConfirmed = window.confirm(
    `Are you sure you want to delete: ${JSON.stringify(row)}?`
  );
  if (isConfirmed) {
    try {
      // const response = await fetch(`http://localhost:5000/closetsRoutes/${_id}`, {
        const response = await fetch(`${path}closetsRoutes/${_id}`, {

        method: "DELETE",
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Deletion canceled!");
  }
};

export default deleteCloset;
