import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      total: 0,
    };
  }
  componentDidMount() {
    if (this.props.items.length) {
      let order = this.props.items.find(
        (order) => order.order_id === this.props.match.params.orderID
      );
      if (order.order_id) {
        this.setState({ order: order });

        let total = order.order
          .map((order) => order.quantity * order.amount)
          .reduce((a, b) => a + b);
        this.setState({ total: total });
      }
    }
  }
  render() {
    let items = this.state.order.order_id
      ? this.state.order.order.map((item) => {
          return (
            <li className="collection-item avatar" key={item.menu.name}>
              <div className="item-img">
                <img src={item.menu.image} alt={"Pizza"} className="" />
              </div>

              <div className="item-desc">
                <span className="title confirmed">{item.menu.name}</span>
                <p>{item.desc}</p>
                <p>
                  <b>Price: €{item.amount}</b>
                </p>
                <p>
                  <b>Quantity: {item.quantity}</b>
                </p>
              </div>
            </li>
          );
        })
      : "";
    let costTable = this.state.order.order_id ? (
      <div>
        <div className="collection">
          <li className="collection-item">
            <label>
              <span>Date : ({this.state.order.created_at})</span>
            </label>
          </li>
          <li className="collection-item">
            <b>Total (€): {this.state.total}</b>
          </li>
          <li className="collection-item">
            <b>
              Total ($):{" "}
              {(
                this.props.EUR_TO_USD *
                (+this.state.total + +this.props.delivery_cost)
              ).toFixed(2)}
            </b>
          </li>
          <li className="collection-item">
            <b>Name : {this.state.order.customer_name} </b>
          </li>
          <li className="collection-item">
            <b>Phone Number : {this.state.order.customer_phone} </b>
          </li>
          <li className="collection-item">
            <b>Delivered To: {this.state.order.delivery_address}</b>
          </li>
        </div>
      </div>
    ) : (
      ""
    );
    return (
      <div className="container">
        {this.props.isLoggedIn ? "" : <Redirect to="/login" />}
        <div className="cart">
          <h5>
            <b>Order #{this.state.order.order_id}:</b>
          </h5>
          <ul className="collection"> {items}</ul>
          {costTable}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.customer_orders,
    isLoggedIn: state.isLoggedIn,
    isLoading: state.isLoading,
    EUR_TO_USD: state.store_info.EUR_TO_USD,
    delivery_cost: state.store_info.delivery_cost,
  };
};

export default connect(mapStateToProps)(Order);
