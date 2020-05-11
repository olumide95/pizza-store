import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import ConfirmOrder from "./components/ConfirmOrder";
import { getInitalData } from "./reducers/storeReducer.js";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.getInitalData();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Switch>
            <Route exact path="/" component={Menu} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/confirm-order" component={ConfirmOrder} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect((state) => state, { getInitalData })(App);
