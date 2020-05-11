import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { takeOrder } from "../Actions/storeActions";
class confirmOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", phone: "", address: "" };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  handletakeOrder = (name, phone, address) => {
    this.props.takeOrder(name, phone, address);
  };

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handlePhoneChange(event) {
    this.setState({ phone: event.target.value });
  }

  handleAddressChange(event) {
    this.setState({ address: event.target.value });
  }

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
        <form
          className="col s12"
          onSubmit={(e) => {
            e.preventDefault();
            this.handletakeOrder(
              this.state.name,
              this.state.phone,
              this.state.address
            );
          }}
        >
          <h5>
            <b>Delivery Information</b>
          </h5>
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
              <label htmlFor="name">Full Name</label>
            </div>

            <div className="input-field col s6">
              <input
                id="number"
                type="number"
                value={this.state.phone}
                onChange={this.handlePhoneChange}
                className="validate"
                required
              />
              <label htmlFor="number">Phone Number</label>
            </div>
            <div className="input-field col s12">
              <textarea
                id="delivery_address"
                value={this.state.address}
                onChange={this.handleAddressChange}
                className="materialize-textarea"
                required
              ></textarea>
              <label htmlFor="delivery_address">Delivery Address</label>
            </div>
          </div>
          <div className="checkout">
            <button className="waves-effect waves-light btn-large red darken-3">
              Confirm Order <i className="material-icons right">done</i>
            </button>
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
            <Link to="/cart" style={{ float: "right", fontSize: "0.7em" }}>
              <button className="waves-effect waves-light btn red ">
                Edit Order <i className="material-icons left">edit</i>
              </button>
            </Link>
          </h5>
          <br />
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
    takeOrder: (name, phone, address) => {
      dispatch(takeOrder(name, phone, address));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(confirmOrder);
