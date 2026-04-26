// store/utils/thunkFactory.js
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * @param {string} type - The action type string
 * @param {Function} serviceFn - The API service function
 * @param {Object} meta - Resource metadata (dataKey, operation, etc.)
 */
export const createServiceThunk = (type, serviceFn, meta) => {
  return createAsyncThunk(
    type,
    async (params, { rejectWithValue }) => {
      try {
        const response = await serviceFn(params);

        // This structure allows our helpers to know which key to update
        return {
          payloadData: response?.data,
          resourceMeta: meta,
        };
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "An unexpected error occurred"
        );
      }
    },
    {
      // This attaches the meta to the 'pending' action so the UI 
      // knows which specific list is loading (e.g., for pagination)
      getPendingMeta: () => ({ resourceMeta: meta }),
    }
  );
};