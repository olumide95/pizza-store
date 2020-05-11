import {
  ADD_TO_CART,
  REMOVE_ITEM,
  ADD_QUANTITY,
  SUB_QUANTITY,
} from "../Actions/action-types/cart-actions";
import toast from "../components/toast";
import { ApiService } from "../Api.service";

const defaultState = {
  items: {},
  cartItems: localStorage.cartItems ? JSON.parse(localStorage.cartItems) : [],
  total: localStorage.total ? parseInt(localStorage.total) : 0,
  store_info: {},
  isDataInitialized: false,
  isLoggedIn: localStorage.isLoggedIn ?? 0,
  customer_info: localStorage.user ? JSON.parse(localStorage.user) : {},
  token: localStorage.token ? localStorage.token : "",
  customer_orders: {},
  customer_name: localStorage.user ? JSON.parse(localStorage.user).name : "",
  isLoading: false,
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
    case "TOGGLE_LOADING": {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case "AUTHENTICATED":
      {
        return {
          ...state,
          customer_name: action.res.user.name,
          token: action.res.token,
          customer_info: JSON.stringify(action.res.user),
          isLoggedIn: 1,
        };
      }
      break;

    case "LOGOUT":
      {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        return {
          ...state,
          token: "",
          customer_info: "",
          isLoggedIn: 0,
          customer_orders: {},
        };
      }
      break;
    case "TAKE_ORDER":
      {
        return {
          ...state,
          cartItems: [],
          total: 0,
        };
      }
      break;

    case "GET_ORDERS":
      {
        return {
          ...state,
          customer_orders: action.res.data,
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
          toast("success", "Item Added to cart");
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
          toast("success", "Item Added to cart");
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

        localStorage.cartItems = [JSON.stringify(new_items)];
        localStorage.total = newTotal;
        toast("error", "Item Removed from cart");
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

export const getInitalData = () => async (dispatch) => {
  dispatch({
    type: "TOGGLE_LOADING",
    isLoading: true,
  });
  ApiService.menu()
    .then((res) => {
      let metadata = res;
      dispatch({
        type: "DATA_INITIALIZED",
        metadata,
        isDataInitialized: true,
      });

      dispatch({
        type: "TOGGLE_LOADING",
        isLoading: false,
      });
    })
    .catch((err) => {
      toast("error", err.message);
      dispatch({
        type: "TOGGLE_LOADING",
        isLoading: false,
      });
    });
};

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: "TOGGLE_LOADING",
    isLoading: true,
  });
  ApiService.login(email, password)
    .then((res) => {
      toast("success", res.message);
      localStorage.user = JSON.stringify(res.user);
      localStorage.token = res.token;
      localStorage.isLoggedIn = 1;
      dispatch({
        type: "TOGGLE_LOADING",
        isLoading: false,
      });

      dispatch({ type: "AUTHENTICATED", res, isLoggedIn: 1 });
    })
    .catch((err) => {
      toast("error", err.message);
      dispatch({
        type: "TOGGLE_LOADING",
        isLoading: false,
      });
    });
};

export const register = (
  name,
  email,
  password,
  password_confirmation
) => async (dispatch) => {
  dispatch({
    type: "TOGGLE_LOADING",
    isLoading: true,
  });
  ApiService.register(name, email, password, password_confirmation)
    .then((res) => {
      toast("success", res.message);
      localStorage.user = JSON.stringify(res.user);
      localStorage.token = res.token;
      localStorage.isLoggedIn = 1;
      dispatch({
        type: "TOGGLE_LOADING",
        isLoading: false,
      });
      dispatch({ type: "AUTHENTICATED", res, isLoggedIn: 1 });
    })
    .catch((err) => {
      toast("error", err.message);
      dispatch({
        type: "TOGGLE_LOADING",
        isLoading: false,
      });
    });
};

export const takeOrder = (cartItems, name, phone, address, uuid) => async (
  dispatch
) => {
  dispatch({
    type: "TOGGLE_LOADING",
    isLoading: true,
  });
  ApiService.confirmOrder(cartItems, phone, name, address, uuid)
    .then((res) => {
      toast("success", res.message);
      localStorage.removeItem("cartItems");
      localStorage.removeItem("total");
      dispatch({
        type: "TOGGLE_LOADING",
        isLoading: false,
      });
      dispatch({ type: "TAKE_ORDER", res, isLoggedIn: 1 });
    })
    .catch((err) => window.console.log(err));
};

export const getOrders = () => async (dispatch) => {
  dispatch({
    type: "TOGGLE_LOADING",
    isLoading: true,
  });
  ApiService.getOrders()
    .then((res) => {
      dispatch({
        type: "TOGGLE_LOADING",
        isLoading: false,
      });
      dispatch({ type: "GET_ORDERS", res });
    })
    .catch((err) => window.console.log(err));
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

export default storeReducer;
