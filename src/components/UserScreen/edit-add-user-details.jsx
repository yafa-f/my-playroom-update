import React, { useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import "./userScreen.css";
import "./edit-and-add.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ADD_USER } from "../../app/slices/usersSlice";
import { UPDATE_USER } from "../../app/slices/usersSlice";
import NewUserFunction from "../AddFunctions/newUserFunction";
import UpdateUser from "../UpdateFunction/UpdateUser";
import { CircularProgress, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { setSingleUser } from "../../app/slices/singleUserSlice";

export const EditAddUserDetails = (props) => {
  const user = props.user;
  const location = useLocation();
  const isEdit = location.pathname.endsWith("editUser") ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToUpdate = user || {};
  const [status, setStatus] = useState(null);
  const [circleFlag, setCircleFlag] = useState(false);
  const [buttonText, setButtonText] = useState("אישור");
  const isCheck =
    userToUpdate.paymentType !== "אשראי" &&
    userToUpdate.paymentType !== "מזומן";
  const [isPaymentTypeIsCheck, setIsPaymentTypeIsCheck] = useState(
    !isEdit ? false : isCheck
  );
  const singleUser = useSelector((state) => state.singleUser.singleUser);

  const [isChecked, setIsChecked] = useState(
    location.pathname.endsWith("newUser")
      ? false
      : userToUpdate.depositPaid?.toLowerCase() === "false" ||
        userToUpdate.depositPaid === false
      ? false
      : true
  );
  const [localUsers, setLocalUsers] = useState(
    useSelector((state) => state.user.users)
  );
  const generateUserCode = (userToUpdate, localUsers) => {
    if (userToUpdate.userCode) {
      return userToUpdate.userCode;
    }

    const codes = localUsers.data.map((user) => Number(user.userCode));

    let randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * 10000) + 1;
    } while (codes.includes(randomNumber));

    return randomNumber;
  };
  const handleSaveClick = () => {
    if (isEdit === true) {
      handleUpdateUser();
    } else {
      handleAddUser();
    }
  };
  const handleAddUser = async () => {
    setStatus(null);
    setCircleFlag(true);
    const today = new Date();
    const updatedUserData = {
      ...userData,
      userDate: today.toLocaleDateString(),
    };
    const addResponse = await NewUserFunction(updatedUserData);
    setTimeout(() => {
      setCircleFlag(false);
    }, 1000);
    if (addResponse) {
      const rearrangedUserData = {
        _id: addResponse._id,
        userCode: addResponse.userCode,
        userName: addResponse.userName,
        userDate: addResponse.userDate,
        phone: addResponse.phone,
        cellphone: addResponse.cellphone,
        depositPaid: addResponse.depositPaid,
        paymentType: addResponse.paymentType,
        totalPayment: addResponse.totalPayment,
        bankNumber: addResponse.bankNumber,
        accountNumber: addResponse.accountNumber,
        checkNumber: addResponse.checkNumber,
        branchNumber: addResponse.branchNumber,
        email: addResponse.email,
      };
      dispatch(ADD_USER(rearrangedUserData));
      setStatus("success");
      setButtonText("המשתמש נוסף בהצלחה");
      setTimeout(() => {
        navigate("/UsersList");
      }, 3000);
      setTimeout(() => {
        setCircleFlag(false);
      }, 1000);
    } else {
      setStatus("error");
      console.error("failad to add object");
      setButtonText("ההוספה נכשלה");
    }
  };
  const handleUpdateUser = async () => {
    setStatus(null);
    setCircleFlag(true);
    const updatedUserData = {
      ...userData,
    };
    const updateUser = await UpdateUser(updatedUserData);
    setTimeout(() => {
      setCircleFlag(false);
    }, 1000);
    if (updateUser) {
      dispatch(UPDATE_USER(updatedUserData));
      dispatch(setSingleUser(updatedUserData));
      setStatus("success");
      setButtonText("המשתמש עודכן בהצלחה");
      setTimeout(() => {
        navigate("/UsersList");
      }, 3000);
      setTimeout(() => {
        setCircleFlag(false);
      }, 1000);
    } else {
      setStatus("error");
      setButtonText("העדכון נכשל");
    }
  };

  const [userData, setUserData] = useState({
    userCode: generateUserCode(userToUpdate, localUsers),
    userName: "",
    userDate: "",
    cellphone: "",
    phone: "",
    depositPaid: "false",
    paymentType: "",
    totalPayment: "",
    bankNumber: "",
    accountNumber: "",
    checkNumber: "",
    branchNumber: "",
    email: "",
  });

  useEffect(() => {
    if (isEdit && userToUpdate) {
      setUserData(singleUser);
    }
  }, [isEdit, userToUpdate]);

  return (
    <div className="deposit-and-details">
      <div className="deposit-and-save">
        <div className="depositDiv">
          <div className="insideDepositDiv">
            <div className="coins-icon"> </div>{" "}
            <div className="beside-coins-icon">פיקדון</div>
          </div>

          <div className="isPaid-cost-wayPaid">
            <input
              type="checkbox"
              checked={isChecked}
              className="custom-checkbox"
              onChange={(event) => {
                setIsChecked(!isChecked);
                setUserData({
                  ...userData,
                  depositPaid: String(!isChecked),
                });
              }}
            />
            <div className="isPaid">שולם פיקדון</div>
            <div
              className="cost"
              style={{
                width: "180px",
              }}
            >
              <div className="costText">סכום</div>
              <input
                type="text"
                value={userData.totalPayment}
                className="totalPaymentText"
                onChange={(event) =>
                  setUserData({ ...userData, totalPayment: event.target.value })
                }
              ></input>{" "}
            </div>
            <div className="wayPaidPlusInput">
              <div className="wayPaidText">
                אמצעי תשלום
                <select
                  name="paymentType"
                  id="paymentType"
                  className="payment-type-select"
                  value={userData.paymentType || ""}
                  onChange={(event) => {
                    setUserData({
                      ...userData,
                      paymentType: event.target.value,
                    });
                    if (event.target.value === "צק")
                      setIsPaymentTypeIsCheck(true);
                    else setIsPaymentTypeIsCheck(false);
                  }}
                >
                  <option value="" disabled></option>{" "}
                  <option value="צק">צ"ק</option>
                  <option value="אשראי">אשראי</option>
                  <option value="מזומן">מזומן</option>
                </select>
              </div>
            </div>
          </div>
          {isPaymentTypeIsCheck && (
            <div className="details">
              <div className="all-details-with-attributes">
                <div className="detail-with-attribute">
                  <div className="detail-attribute"> מס' בנק</div>{" "}
                  <input
                    className="detail-input"
                    type="text"
                    value={userData.bankNumber}
                    onChange={(event) =>
                      setUserData({
                        ...userData,
                        bankNumber: event.target.value,
                      })
                    }
                  ></input>{" "}
                </div>
                <div className="detail-with-attribute">
                  <div className="detail-attribute">מס' סניף </div>{" "}
                  <input
                    className="detail-input"
                    type="text"
                    value={userData.branchNumber}
                    onChange={(event) =>
                      setUserData({
                        ...userData,
                        branchNumber: event.target.value,
                      })
                    }
                  ></input>{" "}
                </div>

                <div className="detail-with-attribute">
                  <div className="detail-attribute">מס' חשבון </div>{" "}
                  <input
                    className="detail-input"
                    type="text"
                    value={userData.accountNumber}
                    onChange={(event) =>
                      setUserData({
                        ...userData,
                        accountNumber: event.target.value,
                      })
                    }
                  ></input>{" "}
                </div>
                <div className="detail-with-attribute">
                  <div className="detail-attribute"> מס' שק</div>{" "}
                  <input
                    className="detail-input"
                    type="text"
                    value={userData.checkNumber}
                    onChange={(event) =>
                      setUserData({
                        ...userData,
                        checkNumber: event.target.value,
                      })
                    }
                  ></input>{" "}
                </div>
              </div>
            </div>
          )}
        </div>
        <Button
          className="save"
          value={buttonText}
          onClick={handleSaveClick}
          sx={{
            width: "70px",
            height: "30px",
            borderRadius: "28px",
            marginTop: "10px",
            backgroundColor: "#0678fc",
            fontWeight: "700",
            display: "block",
            color: "white",
            marginLeft: "52px",
          }}
        >
          {circleFlag ? (
            <CircularProgress size={24} color="white" />
          ) : status === "success" ? (
            <CheckIcon />
          ) : status === "error" ? (
            <CloseIcon />
          ) : (
            "אישור"
          )}
        </Button>
      </div>
      <div className="personalDetails">
        <div className="personalDetailsTextAndIcon">
          <PersonIcon
            sx={{ color: "#0678FC", width: "35px", height: "35px" }}
          ></PersonIcon>
          <div className="personalDetailsText">פרטים אישיים</div>{" "}
        </div>
        <div className="details">
          <div className="detail-with-attribute">
            <div className="detail-attribute">שם </div>{" "}
            <input
              className="detail-input"
              type="text"
              value={userData.userName}
              onChange={(event) =>
                setUserData({ ...userData, userName: event.target.value })
              }
            ></input>
            
          </div>
          <div className="detail-with-attribute">
            <div className="detail-attribute">מייל</div>{" "}
            <input
              className="detail-input"
              type="text"
              value={userData.email}
              onChange={(event) =>
                setUserData({ ...userData, email: event.target.value })
              }
            ></input>{" "}
          </div>
          <div className="detail-with-attribute">
            <div className="detail-attribute">טלפון 1</div>{" "}
            <input
              className="detail-input"
              type="text"
              value={userData.cellphone}
              onChange={(event) =>
                setUserData({ ...userData, cellphone: event.target.value })
              }
            ></input>{" "}
          </div>
          <div className="detail-with-attribute">
            <div className="detail-attribute">טלפון 2</div>{" "}
            <input
              className="detail-input"
              type="text"
              value={userData.phone}
              onChange={(event) =>
                setUserData({ ...userData, phone: event.target.value })
              }
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};