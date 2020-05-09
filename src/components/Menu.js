import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "./Actions/cartActions";

class Menu extends Component {
  handleClick = (id) => {
    this.props.addToCart(id);
  };

  render() {
    const itemList = () => {
      return this.props.items.map((item) => {
        return (
          <div className="card custom-rounded" key={item.uuid}>
            <div className="card-image">
              <img src={item.image} alt={item.name} />

              <span
                to="/"
                className="btn-floating halfway-fab waves-effect waves-light red"
              >
                <i className="material-icons">add</i>
              </span>
            </div>

            <div className="card-content">
              <span className="card-title">{item.name}</span>
              <p>
                <b>Price: {item.amount}$</b>
              </p>
            </div>
          </div>
        );
      });
    };

    if (!this.props.isDataInitialized) return <div>Initializing data...</div>;
    else if (this.props.isDataInitialized) {
      return (
        <div className="container">
          <h3 className="center">Our Menu</h3>
          <div className="box">{itemList()}</div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    isDataInitialized: state.isDataInitialized,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
  };
};

export default connect(mapStateToProps)(Menu);
