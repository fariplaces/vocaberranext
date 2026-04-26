import { createSelector } from "@reduxjs/toolkit";
import { AUTH_KEYS } from "../constants/authConstants";

// 1. Base Selector (Internal)
// In JS, we don't need the RootState type; it just takes the global state object.
const selectAuthSlice = (state) => state.auth;

// 2. Granular Memoized Selectors
// We use dynamic keys (AUTH_KEYS) to stay consistent with your reducer/constants.

export const selectUser = createSelector(
  [selectAuthSlice],
  (auth) => auth[AUTH_KEYS.USER]
);

export const selectIsAuthenticated = createSelector(
  [selectAuthSlice],
  (auth) => auth[AUTH_KEYS.IS_AUTHENTICATED]
);

export const selectAuthLoading = createSelector(
  [selectAuthSlice],
  (auth) => auth[AUTH_KEYS.LOADING]
);

export const selectAuthError = createSelector(
  [selectAuthSlice],
  (auth) => auth[AUTH_KEYS.ERROR]
);

/**
 * 3. Combined Meta-Data Selector
 * This is very efficient for your 'AuthCheck' component.
 * It only re-calculates if one of the underlying values actually changes.
 */
export const selectAuthMetaData = createSelector(
  [selectUser, selectIsAuthenticated, selectAuthLoading, selectAuthError],
  (user, isAuthenticated, loading, error) => ({
    user,
    isAuthenticated,
    loading,
    error,
  })
);