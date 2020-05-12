import axios from "axios";
const ApiService = {
  baseUrl: "",
  init(baseURL) {
    ApiService.baseUrl = baseURL;
    axios.defaults.baseURL = baseURL;
  },
  menu: async () => {
    return await axios
      .get("/api/menu")
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => {
        return Promise.reject(error.response.data);
      });
  },

  getOrders: async () => {
    return await axios
      .get("/api/orders", {
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
      .post("/api/order", {
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
      .post("/api/login", {
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
      .post("/api/register", {
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
