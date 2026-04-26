import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * @param {string} type - The action type string (e.g., 'auth/login')
 * @param {Function} serviceFn - The service function to call
 */
export const createServiceThunk = (type, serviceFn) => {
  return createAsyncThunk(
    type,
    async (arg, { getState, rejectWithValue }) => {
      try {
        // The serviceFn handles the API call
        const response = await serviceFn(arg, getState);

        /**
         * If your API returns the structure expected by your 
         * handleResourceFulfilled helper, we return the whole object.
         * Structure: { payloadData: { data: ... }, resourceMeta: { ... } }
         */
        return response.data;
      } catch (error) {
        // Standard error handling for Laravel/Node backends
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
    }
  );
};