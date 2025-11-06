import axios from "axios";

const API = axios.create({
  baseURL: "https://gmkv-backend.onrender.com/api"
});


export const setAuth = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default API;
