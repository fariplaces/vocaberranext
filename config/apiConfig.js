import axios from "axios";

const API = axios.create({
   // Your Laravel or Next.js API endpoint
   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
   // Essential for sending/receiving cookies (Sanctum/Sessions)
   withCredentials: true,
});

// Response Interceptor: Handles global errors (like 401 Unauthorized)
API.interceptors.response.use(
   (response) => response,
   (error) => {
      const isLoginRequest = error.config.url.includes("/auth/login");
      // If the server returns 401, the user's session is likely invalid
      if (error.response?.status === 401 && !isLoginRequest) {
         console.error("Session expired. Please log in again.");
         // Note: You could also trigger a Redux logout action here 
         // if you want to redirect the user to /login automatically.
      }
      return Promise.reject(error);
   }
);

export default API;