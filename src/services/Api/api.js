import axios from "axios";

const api = axios.create({
  // baseURL: 'http://localhost:3333'
  baseURL: 'http://46.101.99.135'
});

export default api;
