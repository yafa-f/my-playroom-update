import { path } from "../../utils/server";

const deleteDebt = async (row) => {
  const { _id } = row;
  
    try {
      const response = await fetch(`${path}debtsRoutes/${_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
 
};

export default deleteDebt;
