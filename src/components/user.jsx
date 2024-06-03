import React from "react";
import { useSelector } from "react-redux";
export const User = () => {
  const usersFromStore = useSelector((state) => state.user.users);
  return (
    <div>
      {usersFromStore?.data?.map((currentUser) => (
        <div>{currentUser.userName}</div>
      ))}
    </div>
  );
};


