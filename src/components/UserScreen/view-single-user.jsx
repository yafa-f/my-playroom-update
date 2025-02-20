import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import "./userScreen.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UserTitle } from "./userTitle";
import { DepositAndDetailsComp } from "./deposit-and-details";
import { SET_CURRENT_USER } from "../../app/slices/usersSlice";

export const ViewSingleUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const singleUser = useSelector((state) => state.singleUser.singleUser);
  const currentUser = useSelector((state) => state.user.currentUser);
  const user = location.state?.user || currentUser;

  useEffect(() => {
    if (user) {
      dispatch(SET_CURRENT_USER(user));
    }
  }, [user, dispatch]);

  const editUser = () => {
    navigate("/singleUser/editUser", { state: { user } });
  };

  const {
    userName,
    phone,
    cellphone,
    email,
    userCode,
    userDate,
    branchNumber,
    checkNumber,
    accountNumber,
    bankNumber,
    totalPayment,
    depositPaid,
    paymentType,
  } = singleUser;

  return (
    <div className="screen" style={{ display: "grid", position: "absolute" }}>
      <UserTitle
        name={userName}
        phone={phone}
        cellphone={cellphone}
        email={email}
      />
      <button className="edit-button" onClick={editUser}>
        <EditIcon sx={{ color: "#0678FC" }} />
      </button>
      
      <DepositAndDetailsComp
        userCode={userCode}
        userName={userName}
        userDate={userDate}
        phone={phone}
        cellphone={cellphone}
        email={email}
        branchNumber={branchNumber}
        checkNumber={checkNumber}
        accountNumber={accountNumber}
        bankNumber={bankNumber}
        totalPayment={totalPayment}
        depositPaid={depositPaid}
        paymentType={paymentType}
      />
    </div>
  );
};