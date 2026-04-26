// @/store/selectors/authSelectors.js
import { createSelector } from "@reduxjs/toolkit";
import { AUTH_KEYS } from "@/store/constants/authConstants";

export const selectAuthState = (state) => state.auth;

export const selectUser = createSelector(
   [selectAuthState],
   (auth) => auth[AUTH_KEYS.USER]
);

export const selectIsAuthenticated = createSelector(
   [selectAuthState],
   (auth) => auth[AUTH_KEYS.IS_AUTHENTICATED]
);

export const selectAuthLoading = createSelector(
   [selectAuthState],
   (auth) => auth[AUTH_KEYS.LOADING]
);

export const selectAuthError = createSelector(
   [selectAuthState],
   (auth) => auth[AUTH_KEYS.ERROR]
);

// This combined selector is now memoized and performance-optimized
export const selectAuthMetaData = createSelector(
   [selectUser, selectIsAuthenticated, selectAuthLoading, selectAuthError],
   (user, isAuthenticated, loading, error) => ({
      user,
      isAuthenticated,
      loading,
      error,
   })
);