// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // ✅ Make sure this matches your backend
  withCredentials: true, // if using cookies
});

export default instance;
