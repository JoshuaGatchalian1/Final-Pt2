import React from "react";
import { Link } from "react-router-dom";

function NavigationBar({ cartCount }) {
  return (
    <nav>
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/cart" className="nav-link">Cart ({cartCount})</Link>
    </nav>
  );
}

export default NavigationBar;
