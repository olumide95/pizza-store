import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../reducers/storeReducer.js";
import toast from "../components/toast";
class confirmOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
  }

  handleRegister = (name, email, password, confirm_password) => {
    if (password !== confirm_password) {
      toast("error", "Password does not match");
      return;
    }

    this.props.register(name, email, password, confirm_password);
  };

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleConfirmPasswordChange(event) {
    event.target.setCustomValidity("");
    this.setState({ confirm_password: event.target.value });
  }

  render() {
    let register = !this.props.isLoggedIn ? (
      <div className="row Form">
        <form
          className="col s12"
          onSubmit={(e) => {
            e.preventDefault();
            this.handleRegister(
              this.state.name,
              this.state.email,
              this.state.password,
              this.state.confirm_password
            );
          }}
        >
          <h3>
            <b>Sign Up</b>
          </h3>

          <div className="row">
            <div className="input-field col s6">
              <input
                id="name"
                type="text"
                className="validate"
                value={this.state.name}
                onChange={this.handleNameChange}
                required
              />
              <label htmlFor="name">Name </label>
            </div>

            <div className="input-field col s6">
              <input
                id="email"
                type="email"
                className="validate"
                value={this.state.email}
                onChange={this.handleEmailChange}
                required
              />
              <label htmlFor="email">Email </label>
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

            <div className="input-field col s6">
              <input
                id="confirm_password"
                type="password"
                value={this.state.confirm_password}
                onChange={this.handleConfirmPasswordChange}
                className="validate"
                minLength="6"
                required
              />
              <label htmlFor="confirm_password">Confirm Password</label>
            </div>
          </div>
          <div className="checkout">
            <button
              className="waves-effect waves-light btn-large red darken-3"
              type="submit"
            >
              Sign Up <i className="material-icons right">power_settings_new</i>
            </button>
          </div>
        </form>
      </div>
    ) : (
      <Redirect to="/" />
    );

    return (
      <div className="container">
        <div className="">{register}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, { register })(confirmOrder);
