import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import "./userScreen.css";

export const DepositAndDetailsComp = ({
  userCode,
  userName,
  userDate,
  phone,
  cellphone,
  email,
  depositPaid,
  paymentType,
  totalPayment,
  bankNumber,
  accountNumber,
  checkNumber,
  branchNumber,
}) => {
  const isPaymentTypeIsCheck =
    paymentType !== "אשראי" && paymentType !== "מזומן" ? true : false;
  const isChecked = depositPaid.toLowerCase() === "true";

  return (
    <div className="deposit-and-details" style={{ display: "inline-flex" }}>
      <div
        className="depositDiv"
        style={{
          width: "700px",
          height: "380px",
          marginTop: "10px",
          marginLeft: "50px",
          gap: "0px",
          borderRadius: "28px",
          border: "1px 0px 0px 0px",
          opacity: "0px",
          backgroundColor: "white",
          direction: "rtl",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              marginTop: "18px",
              marginRight: "30px",
            }}
          >
            <div className="coins-icon"> </div>{" "}
            <div
              style={{
                width: "113px",
                height: "27px",
                fontWeight: 600,
                fontSize: "18px",
                marginRight: "20px",
              }}
            >
              פיקדון
            </div>
          </div>
        </div>

        <div
          className="isPaid-cost-wayPaid"
          style={{
            display: "inline-flex",
            marginTop: "30px",
            marginRight: "81px",
          }}
        >
          <div className="checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              readOnly
              className="custom-checkbox"
            />
          </div>
          <div
            className="isPaid"
            style={{
              width: "105px",
              display: "inline-flex",
              marginRight: "10px",
            }}
          >
            שולם פיקדון
          </div>
          <div
            className="cost"
            style={{
              width: "100px",
              borderRight: "3px solid #0678FC33",
              textAlign: "center",
            }}
          >
            {totalPayment}{" "}
          </div>
          <div
            className="wayPaid"
            style={{
              width: "170px",
              borderRight: "3px solid #0678FC33",
              textAlign: "center",
            }}
          >
            אמצעי תשלום {paymentType}
          </div>
        </div>
        {isPaymentTypeIsCheck && (
          <div className="details" style={{ marginRight: "10px" }}>
            <div className="detail-with-attribute">
              <div className="detail-attribute"> מס' בנק</div>{" "}
              <div className="detail"> {bankNumber}</div>
            </div>
            <div className="detail-with-attribute">
              <div className="detail-attribute">מס' סניף </div>{" "}
              <div className="detail">{branchNumber} </div>
            </div>

            <div className="detail-with-attribute">
              <div className="detail-attribute">מס' חשבון </div>{" "}
              <div className="detail">{accountNumber}</div>
            </div>
            <div className="detail-with-attribute">
              <div className="detail-attribute"> מס' שק</div>{" "}
              <div className="detail">{checkNumber}</div>
            </div>
          </div>
        )}
      </div>
      <div
        className="personalDetails"
        style={{
          width: "420px",
          height: "380px",
          marginTop: "10px",
          marginLeft: "45px",
          gap: "0px",
          borderRadius: "28px",
          border: "1px 0px 0px 0px",
          opacity: "0px",
          backgroundColor: "white",
          direction: "rtl",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            marginTop: "18px",
            marginRight: "30px",
          }}
        >
          <PersonIcon
            sx={{ color: "#0678FC", width: "35px", height: "35px" }}
          ></PersonIcon>
          <div
            style={{
              width: "113px",
              height: "27px",
              fontWeight: 600,
              fontSize: "18px",
              marginRight: "10px",
            }}
          >
            פרטים אישיים
          </div>{" "}
        </div>
        <div className="details">
          <div className="detail-with-attribute">
            <div className="detail-attribute">שם </div>{" "}
            <div className="detail"> {userName}</div>
          </div>

          <div className="detail-with-attribute">
            <div className="detail-attribute">מייל</div>{" "}
            <a href={`mailto:${email}`} className="detail">
              {email}
            </a>
          </div>
          <div className="detail-with-attribute">
            <div className="detail-attribute">טלפון 1</div>{" "}
            <div className="detail">{cellphone}</div>
          </div>
          <div className="detail-with-attribute">
            <div className="detail-attribute">טלפון 2</div>{" "}
            <div className="detail">{phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
