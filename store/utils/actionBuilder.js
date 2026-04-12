import api from "@/config/apiConfig"; // Import your custom instance
import { createAsyncThunk } from "@reduxjs/toolkit";

// Add a 5th parameter for custom sub-paths
export const createApiThunk = (prefix, actionName, method, endpoint, subPath = "") => {
   return createAsyncThunk(
      `${prefix}/${actionName}`,
      async (arg, thunkAPI) => {
         try {
            let response;
            const id = arg?.id || arg; // Get ID if arg is object or simple value

            // Construct dynamic URL: e.g., /notes/5/publish
            const dynamicUrl = subPath
               ? `${endpoint}/${id}/${subPath}`
               : (method === "delete" || actionName.includes("ById") || method === "patch")
                  ? `${endpoint}/${id}`
                  : endpoint;

            if (method === "get") {
               response = await api.get(dynamicUrl, { params: arg });
            } else {
               response = await api[method](dynamicUrl, arg);
            }
            return response.data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
         }
      }
   );
};