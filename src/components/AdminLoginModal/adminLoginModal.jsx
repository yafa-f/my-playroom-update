import React, { useState } from "react";
import "./adminLoginModal.css"; // Ensure to create a CSS file for styling
import { SET_IS_ADMIN } from "../../app/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";
export const AdminLoginModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const toggleModal = () => setIsOpen(false);
  const adminPassword = useSelector((state) => state.admin.adminPassword);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password submission logic here
    console.log("Password submitted:", password);
    toggleModal();
  };
  const checkIsAdmin = () => {
    if (password === adminPassword) {
      dispatch(SET_IS_ADMIN(true));
    }
  };
  return (
    isOpen && (
      <div>
        <div className="modal-overlay">
          <div className="modal">
            <button className="close" onClick={handleSubmit}>
              X
            </button>
            <h2>הכנס סיסמא</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="נא להכניס סיסמא"
                required
              />
              <button type="submit" onClick={checkIsAdmin}>
                אישור
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AdminLoginModal;
