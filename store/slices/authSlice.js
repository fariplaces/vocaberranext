import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/authActions";
import { SLICE_NAMES } from "../constants/sliceConstants";
import { AUTH_KEYS } from "../constants/authConstants";

const authSlice = createSlice({
  name: SLICE_NAMES.AUTH || "auth",
  initialState: {
    [AUTH_KEYS.USER]: null,
    [AUTH_KEYS.LOADING]: true, // Start true for the initial checkAuth call
    [AUTH_KEYS.ERROR]: null,
    [AUTH_KEYS.IS_AUTHENTICATED]: false,
  },
  reducers: {
    setUser: (state, action) => {
      // Handles both direct user objects and { user: { ... } } structures
      const data = action.payload?.user !== undefined ? action.payload.user : action.payload;
      state[AUTH_KEYS.USER] = data;
      state[AUTH_KEYS.IS_AUTHENTICATED] = !!data;
    },
  },
  extraReducers: (builder) => {
    builder


      // ============================================================
      // LOGOUT
      // ============================================================
      .addCase(actions.logoutUser.fulfilled, (state) => {
        state[AUTH_KEYS.USER] = null;
        state[AUTH_KEYS.IS_AUTHENTICATED] = false;
        state[AUTH_KEYS.LOADING] = false;
      })

      // ============================================================
      // SUCCESS ACTIONS (Login, Register, checkAuth)
      // ============================================================
      .addMatcher(
        (action) => [
          actions.loginUser.fulfilled.type,
          actions.registerUser.fulfilled.type,
          actions.checkAuth.fulfilled.type
        ].includes(action.type),
        (state, action) => {
          // Extract user from Next.js response { user: { ... } }
          const userData = action.payload?.user !== undefined ? action.payload?.user : action.payload;

          state[AUTH_KEYS.USER] = userData;
          state[AUTH_KEYS.IS_AUTHENTICATED] = !!userData;
          state[AUTH_KEYS.LOADING] = false;
          state[AUTH_KEYS.ERROR] = null;
        }
      )

      // ============================================================
      // GLOBAL AUTH MATCHERS (Pending & Rejected)
      // ============================================================
      .addMatcher(
        (action) => action.type.startsWith(`${AUTH_KEYS.PREFIX}/`) && action.type.endsWith("/pending"),
        (state) => {
          state[AUTH_KEYS.LOADING] = true;
          state[AUTH_KEYS.ERROR] = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith(`${AUTH_KEYS.PREFIX}/`) && action.type.endsWith("/rejected"),
        (state, action) => {
          state[AUTH_KEYS.LOADING] = false;
          state[AUTH_KEYS.ERROR] = action.payload;

          // If checkAuth fails (session expired), ensure we are logged out
          if (action.type.includes("checkAuth")) {
            state[AUTH_KEYS.USER] = null;
            state[AUTH_KEYS.IS_AUTHENTICATED] = false;
          }
        }
      );
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;