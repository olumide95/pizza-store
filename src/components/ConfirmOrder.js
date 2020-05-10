import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { takeOrder } from "./Actions/storeActions";
class confirmOrder extends Component {
  //to remove the item completely
  handletakeOrder = () => {
    this.props.takeOrder();
  };
  render() {
    let cartItems = this.props.items.length ? (
      this.props.items.map((item) => {
        return (
          <li className="collection-item avatar" key={item.uuid}>
            <div className="item-img">
              <img src={item.image} alt={"Pizza"} className="" />
            </div>

            <div className="item-desc">
              <span className="title confirmed">{item.name}</span>
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
    ) : (
      <Redirect to="/cart" />
    );

    let costTable = this.props.items.length ? (
      <div>
        <div className="collection">
          <li className="collection-item">
            <label>
              <span>Delivery(+€{this.props.delivery})</span>
            </label>
          </li>
          <li className="collection-item">
            <b>Total (€): {this.props.total} </b>
          </li>
          <li className="collection-item">
            <b>Total ($): {this.props.total_USD}</b>
          </li>
        </div>
      </div>
    ) : (
      ""
    );

    let deliveryDetails = this.props.items.length ? (
      <div className="row">
        <form className="col s12">
          <h5>
            <b>Delivery Information</b>
          </h5>
          <div className="row">
            <div className="input-field col s6">
              <input id="name" type="text" className="validate" />
              <label htmlFor="name">Full Name</label>
            </div>

            <div className="input-field col s6">
              <input id="number" type="number" className="validate" />
              <label htmlFor="number">Phone Number</label>
            </div>
            <div className="input-field col s12">
              <textarea
                id="delivery_address"
                className="materialize-textarea"
              ></textarea>
              <label htmlFor="delivery_address">Delivery Address</label>
            </div>
          </div>
          <div className="checkout">
            <button className="waves-effect waves-light btn">Checkout</button>
          </div>
        </form>
      </div>
    ) : (
      ""
    );
    return (
      <div className="container">
        <div className="cart">
          <h5>
            <b>Confirm Your Order:</b>
            <Link to="/cart" style={{ float: "right", "font-size": "0.7em" }}>
              Edit Order
            </Link>
          </h5>
          <ul className="collection">{cartItems}</ul>
        </div>
        {costTable}

        {deliveryDetails}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.cartItems,
    total: +state.total + +state.store_info.delivery_cost,
    delivery: state.store_info.delivery_cost,
    total_USD: (
      state.store_info.EUR_TO_USD *
      (+state.total + +state.store_info.delivery_cost)
    ).toFixed(2),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    takeOrder: () => {
      dispatch(takeOrder());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(confirmOrder);
