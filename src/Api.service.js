import axios from "axios";
const ApiService = {
  baseUrl: "",
  init(baseURL) {
    ApiService.baseUrl = baseURL;
    axios.defaults.baseURL = baseURL;
  },
  menu: async () => {
    return await axios
      .get("/menu")
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => {
        return Promise.reject(error.response.data);
      });
  },

  getOrders: async () => {
    return await axios
      .get("/orders", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => {
        return Promise.reject(error.response.data);
      });
  },

  confirmOrder: async (cartItems, phone, name, address, uuid = null) => {
    return await axios
      .post("/order", {
        order: JSON.stringify(cartItems),
        customer_phone: phone,
        customer_name: name,
        delivery_address: address,
        user_id: uuid,
      })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => {
        return Promise.reject(error.response.data);
      });
  },

  login: async (email, password) => {
    return await axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => {
        return Promise.reject(error.response.data);
      });
  },

  register: async (name, email, password, confirm_password) => {
    return await axios
      .post("/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirm_password,
      })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => {
        return Promise.reject(error.response.data);
      });
  },
};

export { ApiService };
