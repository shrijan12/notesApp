import React from "react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    //resetNotes();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <h1>My Notes</h1>
      <div className="navbar-actions">
        <span className="user-name">Hey {user.name}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
