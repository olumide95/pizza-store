import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../reducers/storeReducer.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleLogin = (email, password) => {
    this.props.login(email, password);
  };

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    let login = !this.props.isLoggedIn ? (
      <div className="row Form">
        <form
          className="col s12"
          onSubmit={(e) => {
            e.preventDefault();
            this.handleLogin(this.state.email, this.state.password);
          }}
        >
          <h3>
            <b>Login</b>
          </h3>

          <div className="row">
            <div className="input-field col s6">
              <input
                id="email"
                type="email"
                className="validate"
                value={this.state.email}
                onChange={this.handleEmailChange}
                required
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field col s6">
              <input
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                className="validate"
                minLength="6"
                required
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="checkout">
            <button className="waves-effect waves-light btn-large red darken-3">
              Login <i className="material-icons right">power_settings_new</i>
            </button>
          </div>
        </form>
      </div>
    ) : (
      <Redirect to="/" />
    );

    return (
      <div className="container">
        <div className="">{login}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, { login })(Login);
