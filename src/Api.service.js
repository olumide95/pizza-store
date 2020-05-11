import axios from "axios";
const ApiService = {
  confirmOrder: async (cartItems, phone, name, address) => {
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
  },

  login: async (email, password) => {
    return await axios
      .post("http://127.0.0.1:8000/api/login", {
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
      .post("http://127.0.0.1:8000/api/register", {
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
