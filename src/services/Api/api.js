import axios from "axios";

const apiFecth = axios.create({
  // baseURL: 'http://localhost:3333'
  baseURL: 'http://46.101.99.135'
});

export default apiFecth;
