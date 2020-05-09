import axios from "axios";
//import { ADD_TO_CART } from "../actions/action-types/cart-actions";

const defaultState = {
  items: {},
  cartItems: localStorage.cartItems ? JSON.parse(localStorage.cartItems) : [],
  total: localStorage.total ? parseInt(localStorage.total) : 0,
  store_info: {},
  isDataInitialized: false,
};

const storeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "DATA_INITIALIZED":
      return {
        ...state,
        items: action.metadata.data,
        store_info: action.metadata.store_info,
        isDataInitialized: true,
      };

    case "ADD_TO_CART":
      let cartItems = state.items.find((item) => item.id === action.id);

      //check if the action id exists in the cartItems
      let existed_item = state.cartItems.find((item) => action.id === item.id);
      if (existed_item) {
        existed_item.quantity += 1;
        localStorage.cartItems = [JSON.stringify(state.cartItems)];
        localStorage.total = state.total + cartItems.amount;
        return {
          ...state,
          total: state.total + cartItems.amount,
        };
      } else {
        cartItems.quantity = 1;
        //calculating the total
        let newTotal = state.total + cartItems.amount;

        if (state.cartItems.length !== 0) {
          localStorage.cartItems = JSON.stringify([
            ...state.cartItems,
            cartItems,
          ]);
        } else {
          localStorage.cartItems = [JSON.stringify(cartItems)];
        }

        localStorage.total = newTotal;
        return {
          ...state,
          cartItems: [...state.cartItems, cartItems],
          total: newTotal,
        };
      }
    default:
      return state;
  }
};

export const getInitalData = () => async (dispatch) => {
  try {
    let metadata = await axios.get("http://127.0.0.1:8000/api/menu");
    metadata = metadata.data;
    // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
    dispatch({ type: "DATA_INITIALIZED", metadata, isDataInitialized: true });
  } catch (error) {
    console.log(error);
  }
};

export default storeReducer;
