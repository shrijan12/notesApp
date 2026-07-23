import React from "react";

const Navbar = () => {
  return (
    <header className="navbar">
      <h1>My Notes</h1>
      <div className="navbar-actions">
        <span className="user-name">Hey John</span>
        <button className="logout-btn" onClick={() => {}}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
