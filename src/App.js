import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import ConfirmOrder from "./components/ConfirmOrder";
import Orders from "./components/Orders";
import Order from "./components/Order";
import { getInitalData } from "./reducers/storeReducer.js";
import { connect } from "react-redux";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
class App extends Component {
  componentDidMount() {
    this.props.getInitalData();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <React.Fragment>
            <Header />
            {this.props.isLoading ? (
              <div>
                <div className="progress">
                  <div className="indeterminate"></div>
                </div>
              </div>
            ) : (
              ""
            )}
            <Switch>
              <Route exact path="/" component={Menu} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/my-orders" component={Orders} />
              <Route exact path="/my-orders/:orderID" component={Order} />
              <Route exact path="/confirm-order" component={ConfirmOrder} />
            </Switch>
          </React.Fragment>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, { getInitalData })(App);
