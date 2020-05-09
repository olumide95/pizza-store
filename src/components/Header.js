import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          Pie Pizza
        </Link>

        <ul className="right">
          <li>
            <Link to="/">Store</Link>
          </li>
          <li>
            <Link to="/cart">
              <i className="material-icons left">shopping_cart</i> Cart
            </Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
