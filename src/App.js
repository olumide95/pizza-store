import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { getInitalData } from "./components/reducers/storeReducer.js";
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
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect((state) => state, { getInitalData })(App);
