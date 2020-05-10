import { TAKE_ORDER } from "./action-types/store-actions";

//confirm customer order
export const takeOrder = () => {
  return {
    type: TAKE_ORDER,
  };
};
