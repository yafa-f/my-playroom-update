import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import "./userScreen.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { UserTitle } from "./userTitle";
import { DepositAndDetailsComp } from "./deposit-and-details";
import { SET_CURRENT_USER } from "../../app/slices/usersSlice";
export const ViewSingleUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const singleUser = useSelector((state) => state.singleUser.singleUser);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [user, setUser] = useState(location.state?.user);
  const editUser = () => {
    navigate("/singleUser/editUser", { state: { user } });
  };
  useEffect(() => {
    if (user) {
      dispatch(SET_CURRENT_USER(user));
    }
    setUser(currentUser);
  }, [user, currentUser, dispatch]);

  return (
    <div className="screen" style={{ display: "grid", position: "absolute" }}>
      <UserTitle
        name={singleUser.userName}
        phone={singleUser.phone}
        cellphone={singleUser.cellphone}
        email={singleUser.email}
      ></UserTitle>
      <button
        style={{
          height: "44px",
          width: "44px",
          borderColor: "#0678FC",
          backgroundColor: "white",
          borderRadius: "9999px",
          marginLeft: "50px",
          marginTop: "10px",
        }}
        onClick={editUser}
      >
        <EditIcon sx={{ color: "#0678FC" }}></EditIcon>
      </button>
      <DepositAndDetailsComp
        userCode={singleUser.userCode}
        userName={singleUser.userName}
        userDate={singleUser.userDate}
        phone={singleUser.phone}
        cellphone={singleUser.cellphone}
        email={singleUser.email}
        branchNumber={singleUser.branchNumber}
        checkNumber={singleUser.checkNumber}
        accountNumber={singleUser.accountNumber}
        bankNumber={singleUser.bankNumber}
        totalPayment={singleUser.totalPayment}
        depositPaid={singleUser.depositPaid}
        paymentType={singleUser.paymentType}
      ></DepositAndDetailsComp>
    </div>
  );
};
