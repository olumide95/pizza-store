import storeReducer from "../reducers/storeReducer";
import {
  ADD_TO_CART,
  REMOVE_ITEM,
  ADD_QUANTITY,
  SUB_QUANTITY,
} from "../Actions/action-types/cart-actions";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

const items = [
  {
    uuid: "ffd97cfe-4317-48f0-9613-c03cd13961fa",
    name: "Margherita",
    image:
      "https://cdn.pixabay.com/photo/2016/04/09/09/22/pizza-1317699__480.jpg",
    amount: 5,
  },
  {
    uuid: "7360b8dd-496a-4bde-ac2c-7cdd4cd82ae5",
    name: "Marinara",
    image:
      "https://cdn.pixabay.com/photo/2014/07/08/12/34/pizza-386717__480.jpg",
    amount: 3,
  },
  {
    uuid: "5e07cac3-d68f-456b-9386-5deb62353545",
    name: "Quattro Stagioni",
    image:
      "https://cdn.pixabay.com/photo/2017/01/03/11/33/pizza-1949183__480.jpg",
    amount: 8,
  },
  {
    uuid: "b07112e0-1e3b-40ce-8617-4a5272d77544",
    name: "Carbonara",
    image:
      "https://cdn.pixabay.com/photo/2017/06/07/10/53/pizza-2380025__480.jpg",
    amount: 4,
  },
];

const orders = [
  {
    order_id: "53455B5",
    delivery_address: "34 odemuyiwa street, idimu road",
    customer_name: "Olumide Ayodeji Olugbemiro",
    customer_phone: "08089625822",
    created_at: "2020-05-13 17:36:49",
    order: [
      {
        quantity: 1,
        amount: 8,
        menu: {
          name: "Quattro Stagioni",
          image:
            "https://cdn.pixabay.com/photo/2017/01/03/11/33/pizza-1949183__480.jpg",
        },
      },
    ],
  },
];

describe("Store Reducer", () => {
  it("should return the initial state", () => {
    expect(storeReducer(undefined, {})).toEqual({
      items: {},
      cartItems: [],
      total: 0,
      store_info: {},
      isDataInitialized: false,
      isLoggedIn: 0,
      customer_info: {},
      token: "",
      customer_orders: {},
      customer_name: "",
      isLoading: false,
    });
  });

  it("should handle ADD_TO_CART", () => {
    expect(
      storeReducer(
        {
          items,
          cartItems: [],
          total: 0,
        },
        {
          type: ADD_TO_CART,
          uuid: "ffd97cfe-4317-48f0-9613-c03cd13961fa",
        }
      )
    ).toEqual({
      items,
      cartItems: [
        {
          uuid: "ffd97cfe-4317-48f0-9613-c03cd13961fa",
          name: "Margherita",
          quantity: 1,
          image:
            "https://cdn.pixabay.com/photo/2016/04/09/09/22/pizza-1317699__480.jpg",
          amount: 5,
        },
      ],
      total: 5,
    });
  });

  it("should handle REMOVE_ITEM", () => {
    expect(
      storeReducer(
        {
          items,
          cartItems: [
            {
              uuid: "ffd97cfe-4317-48f0-9613-c03cd13961fa",
              name: "Margherita",
              quantity: 1,
              image:
                "https://cdn.pixabay.com/photo/2016/04/09/09/22/pizza-1317699__480.jpg",
              amount: 5,
            },
          ],
          total: 5,
        },
        {
          type: REMOVE_ITEM,
          uuid: "ffd97cfe-4317-48f0-9613-c03cd13961fa",
        }
      )
    ).toEqual({
      items,
      cartItems: [],
      total: 0,
    });
  });

  it("should handle SUB_QUANTITY, do not subtract if item quantity is 1", () => {
    expect(
      storeReducer(
        {
          items,
          cartItems: [
            {
              uuid: "ffd97cfe-4317-48f0-9613-c03cd13961fa",
              name: "Margherita",
              quantity: 1,
              image:
                "https://cdn.pixabay.com/photo/2016/04/09/09/22/pizza-1317699__480.jpg",
              amount: 5,
            },
            {
              uuid: "5e07cac3-d68f-456b-9386-5deb62353545",
              name: "Quattro Stagioni",
              quantity: 1,
              image:
                "https://cdn.pixabay.com/photo/2017/01/03/11/33/pizza-1949183__480.jpg",
              amount: 8,
            },
          ],
          total: 13,
        },
        {
          type: SUB_QUANTITY,
          uuid: "ffd97cfe-4317-48f0-9613-c03cd13961fa",
        }
      )
    ).toEqual({
      items,
      cartItems: [
        {
          uuid: "ffd97cfe-4317-48f0-9613-c03cd13961fa",
          name: "Margherita",
          quantity: 1,
          image:
            "https://cdn.pixabay.com/photo/2016/04/09/09/22/pizza-1317699__480.jpg",
          amount: 5,
        },
        {
          uuid: "5e07cac3-d68f-456b-9386-5deb62353545",
          name: "Quattro Stagioni",
          quantity: 1,
          image:
            "https://cdn.pixabay.com/photo/2017/01/03/11/33/pizza-1949183__480.jpg",
          amount: 8,
        },
      ],
      total: 13,
    });
  });

  it("should handle SUB_QUANTITY, subtract if item quantity is greater than 1", () => {
    expect(
      storeReducer(
        {
          items,
          cartItems: [
            {
              uuid: "ffd97cfe-4317-48f0-9613-c03cd13961fa",
              name: "Margherita",
              quantity: 2,
              image:
                "https://cdn.pixabay.com/photo/2016/04/09/09/22/pizza-1317699__480.jpg",
              amount: 5,
            },
            {
              uuid: "5e07cac3-d68f-456b-9386-5deb62353545",
              name: "Quattro Stagioni",
              quantity: 1,
              image:
                "https://cdn.pixabay.com/photo/2017/01/03/11/33/pizza-1949183__480.jpg",
              amount: 8,
            },
          ],
          total: 18,
        },
        {
          type: SUB_QUANTITY,
          uuid: "ffd97cfe-4317-48f0-9613-c03cd13961fa",
        }
      )
    ).toEqual({
      items,
      cartItems: [
        {
          uuid: "ffd97cfe-4317-48f0-9613-c03cd13961fa",
          name: "Margherita",
          quantity: 1,
          image:
            "https://cdn.pixabay.com/photo/2016/04/09/09/22/pizza-1317699__480.jpg",
          amount: 5,
        },
        {
          uuid: "5e07cac3-d68f-456b-9386-5deb62353545",
          name: "Quattro Stagioni",
          quantity: 1,
          image:
            "https://cdn.pixabay.com/photo/2017/01/03/11/33/pizza-1949183__480.jpg",
          amount: 8,
        },
      ],
      total: 13,
    });
  });

  it("should handle ADD_QUANTITY", () => {
    expect(
      storeReducer(
        {
          items,
          cartItems: [
            {
              uuid: "ffd97cfe-4317-48f0-9613-c03cd13961fa",
              name: "Margherita",
              quantity: 1,
              image:
                "https://cdn.pixabay.com/photo/2016/04/09/09/22/pizza-1317699__480.jpg",
              amount: 5,
            },
            {
              uuid: "5e07cac3-d68f-456b-9386-5deb62353545",
              name: "Quattro Stagioni",
              quantity: 1,
              image:
                "https://cdn.pixabay.com/photo/2017/01/03/11/33/pizza-1949183__480.jpg",
              amount: 8,
            },
          ],
          total: 13,
        },
        {
          type: ADD_QUANTITY,
          uuid: "ffd97cfe-4317-48f0-9613-c03cd13961fa",
        }
      )
    ).toEqual({
      items,
      cartItems: [
        {
          uuid: "ffd97cfe-4317-48f0-9613-c03cd13961fa",
          name: "Margherita",
          quantity: 2,
          image:
            "https://cdn.pixabay.com/photo/2016/04/09/09/22/pizza-1317699__480.jpg",
          amount: 5,
        },
        {
          uuid: "5e07cac3-d68f-456b-9386-5deb62353545",
          name: "Quattro Stagioni",
          quantity: 1,
          image:
            "https://cdn.pixabay.com/photo/2017/01/03/11/33/pizza-1949183__480.jpg",
          amount: 8,
        },
      ],
      total: 18,
    });
  });
});
