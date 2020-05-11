import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  componentDidMount() {
    let dropdown = document.querySelectorAll(".dropdown-trigger");
    window.M.Dropdown.init(dropdown, { inDuration: 300, outDuration: 225 });
    let sidenav = document.querySelectorAll(".sidenav");
    window.M.Sidenav.init(sidenav, { inDuration: 300, outDuration: 225 });
  }
  render() {
    return (
      <React.Fragment>
        <ul id="dropdown1" className="dropdown-content">
          <li>
            <Link to="/orders">My Orders</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
        <ul id="dropdown2" className="dropdown-content">
          <li>
            <Link to="/orders">My Orders</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
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
              {!this.props.isLoggedIn ? (
                <li>
                  <Link to="/login">
                    <i className="material-icons left">account_box</i>Login
                  </Link>
                </li>
              ) : (
                ""
              )}

              {!this.props.isLoggedIn ? (
                <li>
                  <Link to="/register">
                    <i className="material-icons left">account_box</i>Register
                  </Link>
                </li>
              ) : (
                ""
              )}

              {this.props.isLoggedIn ? (
                <li>
                  <a
                    className="dropdown-trigger"
                    href="#!"
                    data-target="dropdown1"
                  >
                    <i className="material-icons left">account_circle</i>{" "}
                    {this.props.user.name}
                  </a>
                </li>
              ) : (
                ""
              )}
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
          {!this.props.isLoggedIn ? (
            <li>
              <Link to="/login">
                <i className="material-icons left">account_box</i>Login
              </Link>
            </li>
          ) : (
            ""
          )}

          {!this.props.isLoggedIn ? (
            <li>
              <Link to="/register">
                <i className="material-icons left">account_box</i>Register
              </Link>
            </li>
          ) : (
            ""
          )}

          {this.props.isLoggedIn ? (
            <li>
              <a
                className="dropdown-trigger mobile profile"
                href="#!"
                data-target="dropdown2"
              >
                <i className="material-icons left">account_circle</i>{" "}
                {this.props.user.name}
              </a>
            </li>
          ) : (
            ""
          )}
        </ul>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    user: state.customer_info,
  };
};

export default connect(mapStateToProps)(Header);
