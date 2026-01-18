import axios from "axios";

const api = axios.create({
  baseURL: "https://flash-scale-backend.onrender.com", // backend port
});

export default api;
