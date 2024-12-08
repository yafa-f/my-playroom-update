import React from "react";

const deleteUser = async (row) => {
  const path='https://server-jnz9.onrender.com/'

  const { _id } = row;
  const isConfirmed = window.confirm(
    `Are you sure you want to delete: ${JSON.stringify(row)}?`
  );
  if (isConfirmed) {
    try {
      // const response = await fetch(`http://localhost:5000/userRoutes/${_id}`, {
        const response = await fetch(`${path}userRoutes/${_id}`, {

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

export default deleteUser;
