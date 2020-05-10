import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
} from "./action-types/cart-actions";

//add cart action
export const addToCart = (uuid) => {
  return {
    type: ADD_TO_CART,
    uuid,
  };
};
//remove item action
export const removeItem = (uuid) => {
  return {
    type: REMOVE_ITEM,
    uuid,
  };
};
//subtract qt action
export const subtractQuantity = (uuid) => {
  return {
    type: SUB_QUANTITY,
    uuid,
  };
};
//add qt action
export const addQuantity = (uuid) => {
  return {
    type: ADD_QUANTITY,
    uuid,
  };
};
