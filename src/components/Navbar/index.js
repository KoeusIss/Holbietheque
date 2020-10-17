import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
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
      </ul>
    </div>
  );
}
export default Navbar;
