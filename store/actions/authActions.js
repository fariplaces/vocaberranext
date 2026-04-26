// @/store/actions/authActions.js
import { createServiceThunk } from "@/store/utils/actionBuilder";
import { AUTH_KEYS } from "../constants/authConstants";

const { PREFIX = "auth" } = AUTH_KEYS || {};

export const loginUser = createServiceThunk(PREFIX, "loginUser", "post", "/login");
export const registerUser = createServiceThunk(PREFIX, "registerUser", "post", "/register");
export const checkAuth = createServiceThunk(PREFIX, "checkAuth", "get", "/me");
export const logoutUser = createServiceThunk(PREFIX, "logoutUser", "post", "/logout");

