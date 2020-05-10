import { TAKE_ORDER } from "./action-types/store-actions";

//confirm customer order
export const takeOrder = (name, phone, address) => {
  return {
    type: TAKE_ORDER,
    name,
    phone,
    address,
  };
};
