// @/store/actions/authActions.js
import { createApiThunk } from "@/store/utils/actionBuilder";

const PREFIX = "auth";

export const loginUser = createApiThunk(PREFIX, "loginUser", "post", "/login");
export const registerUser = createApiThunk(PREFIX, "registerUser", "post", "/register");
export const checkAuth = createApiThunk(PREFIX, "checkAuth", "get", "/me");
export const logoutUser = createApiThunk(PREFIX, "logoutUser", "post", "/logout");

