import { path } from "../../utils/server";

const NewDebtFunction = async (debt) => {
  try {
    const response = await fetch(`${path}debtsRoutes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(debt),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Debt added successfully:", data);
    return data; // Return the response data object
  } catch (error) {
    console.error("Error adding debt:", error);
    return null; // Return null in case of an error
  }
};

export default NewDebtFunction;

// import { path } from "../../utils/server";

// const NewDebtFunction = async (debt) => {
//   try {
//     const response = await fetch(`${path}debtsRoutes`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(debt),
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     console.log("add debt successful:", data);
//     return data; // Return the response object
//   } catch (error) {
//     console.error("Error adding debt:", error);
//     return null; // Return null in case of an error
//   }
// };
// export default NewDebtFunction;
