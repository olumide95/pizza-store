import axios from "axios";
//import { ADD_TO_CART } from "../actions/action-types/cart-actions";

const defaultState = {
  items: {},
  cartItems: [],
  total: 0,
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
      //check if the action id exists in the cartItemss
      let existed_item = state.cartItemss.find((item) => action.id === item.id);
      if (existed_item) {
        cartItems.quantity += 1;
        return {
          ...state,
          total: state.total + cartItems.price,
        };
      } else {
        cartItems.quantity = 1;
        //calculating the total
        let newTotal = state.total + cartItems.price;

        return {
          ...state,
          cartItemss: [...state.cartItemss, cartItems],
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
