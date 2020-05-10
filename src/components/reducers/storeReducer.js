import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_ITEM,
  ADD_QUANTITY,
  SUB_QUANTITY,
} from "../Actions/action-types/cart-actions";

import { TAKE_ORDER } from "../Actions/action-types/store-actions";

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
      {
        return {
          ...state,
          items: action.metadata.data,
          store_info: action.metadata.store_info,
          isDataInitialized: true,
        };
      }
      break;

    case TAKE_ORDER:
      {
        takeOrder(state.cartItems, action.phone, action.name, action.address)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => window.console.log(err));

        return {
          ...state,
        };
      }
      break;
    case ADD_TO_CART:
      {
        let cartItems = state.items.find((item) => item.uuid === action.uuid);

        //check if the action id exists in the cartItems
        let existed_item = state.cartItems.find(
          (item) => action.uuid === item.uuid
        );
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
      }
      break;
    case REMOVE_ITEM:
      {
        let itemToRemove = state.cartItems.find(
          (item) => action.uuid === item.uuid
        );
        let new_items = state.cartItems.filter(
          (item) => action.uuid !== item.uuid
        );

        //calculating the total
        let newTotal =
          state.total - itemToRemove.amount * itemToRemove.quantity;
        console.log(itemToRemove);
        localStorage.cartItems = [JSON.stringify(new_items)];
        localStorage.total = newTotal;
        return {
          ...state,
          cartItems: new_items,
          total: newTotal,
        };
      }
      break;
    case ADD_QUANTITY:
      {
        let addedItem = state.cartItems.find(
          (item) => action.uuid === item.uuid
        );

        addedItem.quantity += 1;
        let newTotal = state.total + addedItem.amount;
        localStorage.cartItems = [JSON.stringify(state.cartItems)];
        localStorage.total = newTotal;
        return {
          ...state,
          total: newTotal,
        };
      }
      break;
    case SUB_QUANTITY:
      {
        let addedItem = state.cartItems.find(
          (item) => action.uuid === item.uuid
        );

        if (addedItem.quantity === 1) {
          return {
            ...state,
          };
        } else {
          addedItem.quantity -= 1;
          let newTotal = state.total - addedItem.amount;
          localStorage.cartItems = [JSON.stringify(state.cartItems)];
          localStorage.total = newTotal;
          return {
            ...state,
            total: newTotal,
          };
        }
      }
      break;
    default:
      return state;
  }
};

export const takeOrder = async (cartItems, phone, name, address) => {
  return await axios
    .post("http://127.0.0.1:8000/api/order", {
      order: JSON.stringify(cartItems),
      customer_phone: phone,
      customer_name: name,
      delivery_address: address,
    })
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
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
