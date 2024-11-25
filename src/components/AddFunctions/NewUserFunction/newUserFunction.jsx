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

//     if (response.ok) {
//       setTextFieldPhoneValue("");
//       setTextFieldNameValue("");
//       setTextFieldAdditionalPhoneValue("");
//       setTextCodeValue("");
//       setText("המשתמש נוסף בהצלחה");

//       const userData = await response.json();
//       const rearrangedUserData = {
//         id: userData._id,
//         userCode: userData.userCode,
//         userName: userData.userName,
//         cellphone: userData.cellphone,
//         phone: userData.phone,
//       };
//       dispatch(ADD_USER(rearrangedUserData));
//       setLocalUser(rearrangedUserData);
//       setLocalUsers((prevUsers) => {
//         return { data: [...prevUsers.data, rearrangedUserData] };
//       });

//       setTimeout(() => {
//         setText("להוספה");
//       }, 2000);
//     } else {
//       setText("ההוספה נכשלה");
//     }
//   };

// const NewGameFunction = async (game) => {
//     try {
//       const response = await fetch("http://localhost:5000/gamesListRoutes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(game),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       console.log("add successful:", data);
//       return response; // Return the response object
//     } catch (error) {
//       console.error("Error adding game:", error);
//       return null; // Return null in case of an error
//     }
//   };
//   export default NewGameFunction;
