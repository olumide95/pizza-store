import axios from "axios";

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
