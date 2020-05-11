import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getOrders } from "../reducers/storeReducer.js";
class confirmOrder extends Component {
  componentDidMount() {
    this.props.getOrders();
  }
  render() {
    let orders = this.props.orders.length
      ? this.props.orders.map((order) => {
          return (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.customer_name}</td>
              <td>{order.customer_phone}</td>
              <td>{order.delivery_address}</td>
              <td>{order.order.length}</td>
              <td>{order.created_at}</td>
            </tr>
          );
        })
      : "";

    return (
      <div className="container">
        <div className="orders">
          {this.props.isLoggedIn ? "" : <Redirect to="/login" />}
          {this.props.orders.length ? (
            <table className="striped responsive-table header-fixed">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th> Name</th>
                  <th>Phone</th>
                  <th>Delivery Address</th>
                  <th>Quantity</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>{orders} </tbody>
            </table>
          ) : (
            <h1 className="center-align">You Havent Placed any order</h1>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.customer_orders,
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, { getOrders })(confirmOrder);
