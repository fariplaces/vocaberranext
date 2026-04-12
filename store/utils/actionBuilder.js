import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TYPING_KEYS } from "../constants/typingConstants";

/**
 * @param {string} actionName - The specific action (e.g., 'fetchTypings')
 * @param {string} method - 'get', 'post', 'patch', 'delete'
 * @param {string} endpoint - The API URL
 */
export const createApiThunk = (actionName, method, endpoint) => {
   return createAsyncThunk(
      `${TYPING_KEYS.PREFIX}/${actionName}`,
      async (arg, thunkAPI) => {
         try {
            let response;

            // Handle different argument types based on method
            if (method === "get") {
               // If arg has a page, append it; otherwise use arg as params
               const params = arg?.page ? { page: arg.page } : arg;
               response = await axios.get(endpoint, { params });
            }
            else if (method === "post" || method === "patch") {
               response = await axios[method](endpoint, arg);
            }
            else if (method === "delete") {
               // For delete, 'arg' is usually the ID
               response = await axios.delete(`${endpoint}/${arg}`);
            }

            return response.data;
         } catch (error) {
            return thunkAPI.rejectWithValue(
               error.response?.data?.message || `Failed to ${actionName}`
            );
         }
      }
   );
};