import React from "react";
import { render } from "@testing-library/react";
import Header from "../components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

test("header has store name", () => {
  const { getByText } = render(
    <Router>
      <Header />
    </Router>
  );
  const linkElement = getByText(/Pie Pizza/i);
  expect(linkElement).toBeInTheDocument();
});
