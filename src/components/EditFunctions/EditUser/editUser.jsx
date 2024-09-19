
export const editUser=async(row)=>{
  const { _id } = row;
  const response = await fetch(`http://localhost:5000/userRoutes/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
       body: JSON.stringify(row),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User updated successfully:", data);
    } else {
      console.error("Failed to update user.");
    }

}

 
// import React, { useState } from "react";
// import { Box, Button } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { UPDATE_USER } from "../../../app/slices//usersSlice";
// export const EditUser = (props) => {
//   const [updatedValues, setUpdatedValues] = useState({ ...props.row });
//   const dispatch = useDispatch();
//   const handleInputChange = (e, key) => {
//     setUpdatedValues({ ...updatedValues, [key]: e.target.value });
//   };
//   const handleSave = async () => {
//     const updatedObject = { ...updatedValues };
//     const response = await onSave(updatedObject);
//   };
//   const onSave = async (updatedObject) => {
//     const { _id } = props.row;
//     const response = await fetch(`http://localhost:5000/userRoutes/${_id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedObject),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log("User updated successfully:", data);
//       dispatch(UPDATE_USER(updatedObject));
//       props.editState(!props.isEdit);
//     } else {
//       console.error("Failed to update user.");
//     }
//   };
//   return (
//     <div>
//       <Box
//         margin="auto"
//         height={200}
//         width={200}
//         my={4}
//         display="column"
//         alignContent="center"
//         gap={4}
//         p={2}
//         sx={{ border: "2px solid grey", display: "table" }}
//       >
//         <Button
//           onClick={() => {
//             props.hideComponent();
//           }}
//           sx={{
//             fontFamily: "sans-serif",
//             fontSize: "22px",
//             color: "red",
//             marginLeft: "-18px",
//             marginTop: "-11px",
//             borderRadius: "0px",
//             marginBottom: "-10px",
//           }}
//         >
//           x
//         </Button>

//         {Object.keys(props.row).map((key) => (
//           <div key={key}>
//             <label>{key}</label>
//             <input
//               type="text"
//               value={updatedValues[key]}
//               onChange={(e) => handleInputChange(e, key)}
//             />
//           </div>
//         ))}
//         <button onClick={handleSave}>שמירה</button>
//       </Box>
//     </div>
//   );
// };
