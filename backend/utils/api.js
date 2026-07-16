const axios = require("axios");

const api = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3000/api",
});

// Automatically attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = api;