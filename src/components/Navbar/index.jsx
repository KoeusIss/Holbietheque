import React from "react";
import { Link } from "react-router-dom";

function Navbar({ status, changeStatus }) {
  const handleLogout = (event) => {
    localStorage.removeItem("access_token");
    changeStatus(false);
  };
  return (
    <div>
      <h3>Holbietheque</h3>
      <ul>
        <li>
          <Link to="/students">Students</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        {!status ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </ul>
    </div>
  );
}
export default Navbar;
