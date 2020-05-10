import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeItem,
  addQuantity,
  subtractQuantity,
} from "./Actions/cartActions";
class Cart extends Component {
  //to remove the item completely
  handleRemove = (uuid) => {
    this.props.removeItem(uuid);
  };
  //to add the quantity
  handleAddQuantity = (uuid) => {
    this.props.addQuantity(uuid);
  };
  //to substruct from the quantity
  handleSubtractQuantity = (uuid) => {
    this.props.subtractQuantity(uuid);
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
              <span className="title">{item.name}</span>
              <p>{item.desc}</p>
              <p>
                <b>Price: €{item.amount}</b>
              </p>
              <p>
                <b>Quantity: {item.quantity}</b>
              </p>
              <div className="add-remove">
                <Link to="/cart">
                  <i
                    className="material-icons quantity"
                    onClick={() => {
                      this.handleAddQuantity(item.uuid);
                    }}
                  >
                    add_circle_outline
                  </i>
                </Link>

                <Link to="/cart">
                  <i
                    className="material-icons quantity"
                    onClick={() => {
                      this.handleSubtractQuantity(item.uuid);
                    }}
                  >
                    remove_circle_outline
                  </i>
                </Link>
              </div>
              <button
                className="waves-effect waves-light btn pink remove"
                onClick={() => {
                  this.handleRemove(item.uuid);
                }}
              >
                Remove{""}
              </button>
            </div>
          </li>
        );
      })
    ) : (
      <p> Your Cart is Empty</p>
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
        <div className="checkout">
          <Link to="/confirm-order">
            <button className="waves-effect waves-light btn-large red darken-3">
              Checkout
              <i className="material-icons right">send</i>
            </button>
          </Link>
        </div>
      </div>
    ) : (
      ""
    );

    return (
      <div className="container">
        <div className="cart">
          <h5>
            <b>Cart:</b>
          </h5>
          <ul className="collection">{cartItems}</ul>
        </div>
        {costTable}
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
    removeItem: (uuid) => {
      dispatch(removeItem(uuid));
    },
    addQuantity: (uuid) => {
      dispatch(addQuantity(uuid));
    },
    subtractQuantity: (uuid) => {
      dispatch(subtractQuantity(uuid));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
