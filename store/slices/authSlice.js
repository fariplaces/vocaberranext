import { createSlice } from "@reduxjs/toolkit";
import { AUTH_KEYS } from "@/store/constants/authConstants";
import { SLICE_NAMES } from "@/store/constants/sliceConstants";
import * as actions from "@/store/actions/authActions";

import {
  handleResourcePending,
  handleResourceFulfilled,
  handleResourceRejected,
} from "@/store/utils/reduxHelpers";

// Convert the object of actions into an array for the matcher logic
const allAuthAction = Object.values(actions);

const initialState = {
  [AUTH_KEYS.USER]: null,
  [AUTH_KEYS.LOADING]: false,
  [AUTH_KEYS.ERROR]: null,
  [AUTH_KEYS.IS_AUTHENTICATED]: false,
};

const authSlice = createSlice({
  name: SLICE_NAMES.AUTH,
  initialState,
  reducers: {
    // Manually update the user state if needed (e.g., after profile update)
    setUser: (state, action) => {
      const data = action.payload?.user ?? action.payload;
      state[AUTH_KEYS.USER] = data;
      state[AUTH_KEYS.IS_AUTHENTICATED] = !!data;
    },
    // Reset auth state locally
    clearAuth: (state) => {
      state[AUTH_KEYS.USER] = null;
      state[AUTH_KEYS.IS_AUTHENTICATED] = false;
    },
  },
  extraReducers: (builder) => {
    // 1. PENDING: Catches any 'pending' auth action
    builder.addMatcher(
      (action) => allAuthAction.some((a) => a.pending?.match(action)),
      (state, action) => handleResourcePending(state, action)
    );

    // 2. FULFILLED: Catches any 'fulfilled' auth action
    builder.addMatcher(
      (action) => allAuthAction.some((a) => a.fulfilled?.match(action)),
      (state, action) => handleResourceFulfilled(state, action)
    );

    // 3. REJECTED: Catches any 'rejected' auth action
    builder.addMatcher(
      (action) => allAuthAction.some((a) => a.rejected?.match(action)),
      (state, action) => handleResourceRejected(state, action)
    );
  },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;