import API from "@/config/apiConfig";

export const authServices = {
  // Sends email/password to Laravel and returns the user object
  loginUser: (payload) => 
    API.post("/auth/login", payload),

  // Sends userName/email/password to create a new account
  registerUser: (payload) => 
    API.post("/auth/register", payload),

  // Fetches the currently authenticated user session
  checkAuth: () => 
    API.get("/auth/me"),

  // Destroys the session on the server
  logoutUser: () => 
    API.post("/auth/logout"),
};