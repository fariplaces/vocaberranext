// store/actions/authActions.js
import { authServices } from "@/services/client/authServices";
import { AUTH_KEYS } from "../constants/authConstants";
import { createServiceThunk } from "@/store/utils/thunkFactory";

const PREFIX = AUTH_KEYS.PREFIX;

// LOGIN: Sets the user object (FETCH operation)
export const loginUser = createServiceThunk(
  `${PREFIX}/loginUser`,
  (params) => authServices.loginUser(params),
  { 
    dataKey: AUTH_KEYS.USER, 
    operation: "FETCH" 
  }
);

// CHECK AUTH: Validates current session
export const checkAuth = createServiceThunk(
  `${PREFIX}/checkAuth`,
  () => authServices.checkAuth(),
  { 
    dataKey: AUTH_KEYS.USER, 
    operation: "FETCH" 
  }
);

// REGISTER: Creates account and logs user in (FETCH operation)
export const registerUser = createServiceThunk(
  `${PREFIX}/registerUser`,
  (params) => authServices.registerUser(params),
  {
    dataKey: AUTH_KEYS.USER,
    operation: "FETCH",
  }
);

// LOGOUT: Clears the user state
export const logoutUser = createServiceThunk(
  `${PREFIX}/logoutUser`,
  () => authServices.logoutUser(),
  {
    dataKey: AUTH_KEYS.USER,
    operation: "FETCH", // Payload returns null/empty, clearing the dataKey
  }
);