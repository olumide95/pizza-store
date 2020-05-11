import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../reducers/storeReducer.js";
class Header extends Component {
  componentDidMount() {
    let dropdown = document.querySelectorAll(".dropdown-trigger");
    window.M.Dropdown.init(dropdown, { inDuration: 300, outDuration: 225 });
    let sidenav = document.querySelectorAll(".sidenav");
    window.M.Sidenav.init(sidenav, { inDuration: 300, outDuration: 225 });
  }
  handleLogout = (id) => {
    this.props.logout();
  };
  render() {
    let loggedOut = (
      <React.Fragment>
        <li>
          <Link to="/login">
            <i className="material-icons left">account_box</i>Login
          </Link>
        </li>

        <li>
          <Link to="/register">
            <i className="material-icons left">account_box</i>Register
          </Link>
        </li>
      </React.Fragment>
    );

    let loggedIn = (
      <React.Fragment>
        <React.Fragment>
          <li>
            <Link to="/my-orders">My Orders</Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={() => {
                this.handleLogout();
              }}
            >
              Logout
            </Link>
          </li>
        </React.Fragment>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <ul id="dropdown1" className="dropdown-content">
          {this.props.isLoggedIn ? loggedIn : loggedOut}
        </ul>

        <ul id="dropdown2" className="dropdown-content">
          {this.props.isLoggedIn ? loggedIn : loggedOut}
        </ul>
        <nav className="nav-wrapper red darken-3">
          <div className="container">
            <Link to="/" className="brand-logo">
              {" "}
              Pie Pizza
            </Link>

            <Link to="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </Link>

            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/">
                  <i className="material-icons left">restaurant_menu</i>Menu
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <i className="material-icons left">shopping_cart</i> Cart
                </Link>
              </li>

              <li>
                <Link
                  to=""
                  className="dropdown-trigger"
                  data-target="dropdown1"
                >
                  <i className="material-icons left">account_circle</i>
                  {this.props.customer_name && this.props.isLoggedIn
                    ? this.props.customer_name
                    : "My Account"}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to="/">
              <i className="material-icons left">restaurant_menu</i>Menu
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <i className="material-icons left">shopping_cart</i> Cart
            </Link>
          </li>

          <li>
            <Link
              className="dropdown-trigger mobile profile"
              to=""
              data-target="dropdown2"
            >
              <i className="material-icons left">account_circle</i>
              {this.props.customer_name && this.props.isLoggedIn
                ? this.props.customer_name
                : "My Account"}
            </Link>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    customer_name: state.customer_name,
  };
};

export default connect(mapStateToProps, { logout })(Header);
