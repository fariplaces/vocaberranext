// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// // Auto attach token
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;



// @/lib/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logic for: "User is unauthorized, redirect to login"
      console.error("Session expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);


export default api;