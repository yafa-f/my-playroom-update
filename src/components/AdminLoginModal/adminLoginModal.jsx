import React, { useEffect, useState } from "react";
import "./adminLoginModal.css"; // Ensure to create a CSS file for styling
import { SET_IS_ADMIN } from "../../app/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";

export const AdminLoginModal = ({ isModalOpen, closeModal }) => {
  const [isOpen, setIsOpen] = useState(isModalOpen);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const adminPassword = useSelector((state) => state.admin.adminPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    checkIsAdmin();
  };

  const checkIsAdmin = () => {
    if (password === adminPassword) {
      dispatch(SET_IS_ADMIN(true));
      closeModal(); // Close modal after successful login
    }
  };

  useEffect(() => {
    if (isOpen) {
      setPassword(""); // Reset password on open
      document.getElementById("passwordInput").focus(); // Focus on the input field
    }
  }, [isOpen]);

  return (
    isOpen && (
      <div>
        <div className="modal-overlay">
          <div className="modal">
            <button className="close" onClick={closeModal}>
              X
            </button>
            <h2>הכנס סיסמא</h2>
            <form onSubmit={handleSubmit}>
              <input
                id="passwordInput"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="נא להכניס סיסמא"
                required
              />
              <button type="submit">אישור</button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AdminLoginModal;

// import React, { useState } from "react";
// import "./adminLoginModal.css"; // Ensure to create a CSS file for styling
// import { SET_IS_ADMIN } from "../../app/slices/adminSlice";
// import { useDispatch, useSelector } from "react-redux";

// export const AdminLoginModal = ({ isModalOpen, closeModal }) => {
//   const [isOpen, setIsOpen] = useState(isModalOpen);
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const adminPassword = useSelector((state) => state.admin.adminPassword);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     checkIsAdmin();
//   };

//   const checkIsAdmin = () => {
//     if (password === adminPassword) {
//       dispatch(SET_IS_ADMIN(true));
//       closeModal(); // Close modal after successful login
//     }
//   };

//   return (
//     isOpen && (
//       <div>
//         <div className="modal-overlay">
//           <div className="modal">
//             <button className="close" onClick={closeModal}>
//               X
//             </button>
//             <h2>הכנס סיסמא</h2>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="נא להכניס סיסמא"
//                 required
//               />
//               <button type="submit">אישור</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default AdminLoginModal;
