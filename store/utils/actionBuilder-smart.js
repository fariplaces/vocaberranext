import api from "@/config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createApiThunk = (prefix, actionName, method, endpoint, subPath = "") => {
   return createAsyncThunk(
      `${prefix}/${actionName}`,
      async (arg, thunkAPI) => {
         try {
            let response;

            // 1. Only extract an ID if the argument is a string/number 
            // OR if it's an object containing an .id property.
            const id = (arg && (typeof arg === "string" || typeof arg === "number")) ? arg : arg?.id || null;

            // 2. Refined URL Logic:
            // - Use subPath if provided: /notes/5/publish
            // - Use ID ONLY for specific methods AND if ID exists
            // - Otherwise, use the clean endpoint: /login, /me, /tasks
            const dynamicUrl = subPath
               ? `${endpoint}/${id}/${subPath}`
               : (id && (method === "delete" || method === "patch" || actionName.includes("ById")))
                  ? `${endpoint}/${id}`
                  : endpoint;

            if (method === "get") {
               // For 'get', arg is treated as Query Params (e.g., ?page=1)
               response = await api.get(dynamicUrl, { params: arg });
            } else {
               // For post/patch/put, arg is the Request Body
               response = await api[method](dynamicUrl, arg);
            }

            return response.data;
         } catch (error) {
            return thunkAPI.rejectWithValue(
               error.response?.data?.message || "Something went wrong"
            );
         }
      }
   );
};