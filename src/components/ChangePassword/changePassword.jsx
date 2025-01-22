import React, { useEffect, useState } from "react";
import "./changePassword.css"; // Import your CSS for styling
import { grid } from "@mui/system";
import { SET_CURRENT_PASSWORD } from "../../app/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";

const PasswordChangeModal = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const adminPassword = useSelector((state) => state.admin.adminPassword);
  const dispatch = useDispatch();

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    if (oldPassword === adminPassword) {
      dispatch(SET_CURRENT_PASSWORD(newPassword));
      setMessage("הסיסמה עודכנה בהצלחה");
      setIsOpen(false);
    } else {
      setMessage("הסיסמה לא נכונה, נסה שוב");
    }
  };

  const onClose = () => setIsOpen(false);

  useEffect(() => {}, [isOpen]);

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <h2>Change Password</h2>
          <form style={{ display: grid }} onSubmit={handleSubmitChangePassword}>
            <input
              type="password"
              placeholder="סיסמה ישנה"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="סיסמה חדשה"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">שמירה</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    )
  );
};

export default PasswordChangeModal;

// import React, { useEffect, useState } from "react";
// import "./changePassword.css"; // Import your CSS for styling
// import { grid } from "@mui/system";
// import { SET_CURRENT_PASSWORD } from "../../app/slices/adminSlice";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// const PasswordChangeModal = () => {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isOpen, setIsOpen] = useState(true);
//   const thisToggleModal = () => setIsOpen(false);
//   const adminPassword = useSelector((state) => state.admin.adminPassword);
//   const dispatch = useDispatch();
//   const handleSubmitChangePassword = (e) => {
//     e.preventDefault();
//     if (oldPassword === adminPassword) {
//       dispatch(SET_CURRENT_PASSWORD(newPassword));
//       setMessage("הסיסמה עודכנה בהצלחה", newPassword);
//       thisToggleModal();
//     } else {
//       setMessage("הסיסמה לא נכונה נסה שוב");
//     }
//   };
//   const onClose = () => {
//     thisToggleModal();
//   };
//   useEffect(() => {}, [isOpen]);

//   return (
//     isOpen && (
//       <div className="modal-overlay">
//         <div className="modal-content">
//           <button className="close-button" onClick={onClose}>
//             X
//           </button>
//           <h2>Change Password</h2>
//           <form style={{ display: grid }} onSubmit={handleSubmitChangePassword}>
//             <input
//               type="password"
//               placeholder="סיסמה ישנה"
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="סיסמה חדשה"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//             <button type="submit">שמירה</button>
//           </form>
//           {message && <p>{message}</p>}
//         </div>
//       </div>
//     )
//   );
// };

// export default PasswordChangeModal;
