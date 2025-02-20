import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import "./userScreen.css";

export const DepositAndDetailsComp = ({
  userName,
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
  const isPaymentTypeCheck = paymentType !== "אשראי" && paymentType !== "מזומן";
  const isChecked = depositPaid.toLowerCase() === "true";

  return (
    <div className="deposit-and-details">
      <div className="depositDiv">
        <div className="header">
          <div className="coins-icon"></div>
          <div className="header-title">פיקדון</div>
        </div>

        <div className="payment-info">
          <div className="checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              readOnly
              className="custom-checkbox"
            />
          </div>
          <div className="isPaid">שולם פיקדון</div>
          <div className="cost">{totalPayment}</div>
          <div className="wayPaid">אמצעי תשלום {paymentType}</div>
        </div>

        {isPaymentTypeCheck && (
          <div className="details">
            <DetailRow attribute="מס' בנק" value={bankNumber} />
            <DetailRow attribute="מס' סניף" value={branchNumber} />
            <DetailRow attribute="מס' חשבון" value={accountNumber} />
            <DetailRow attribute="מס' שק" value={checkNumber} />
          </div>
        )}
      </div>

      <div className="personalDetails">
        <div className="header">
          <PersonIcon
            sx={{ color: "#0678FC", width: "35px", height: "35px" }}
          />
          <div className="header-title">פרטים אישיים</div>
        </div>
        <div className="details">
          <DetailRow attribute="שם" value={userName} />
          <DetailRow
            attribute="מייל"
            value={<a href={`mailto:${email}`}>{email}</a>}
          />
          <DetailRow attribute="טלפון 1" value={cellphone} />
          <DetailRow attribute="טלפון 2" value={phone} />
        </div>
      </div>
    </div>
  );
};


const DetailRow = ({ attribute, value }) => (
  <div className="detail-with-attribute">
    <div className="detail-attribute">{attribute}</div>
    <div className="detail">{value}</div>
  </div>
);




