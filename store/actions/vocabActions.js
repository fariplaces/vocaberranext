import API from "@/config/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ================== ASYNC THUNKS ==================

// Fetch all meanings for a word
export const fetchMeanings = createAsyncThunk(
   "meanings/fetchAll",
   async (wordId, thunkAPI) => {
      try {
         const res = await API.get(`/words/${wordId}/meanings`);
         return { wordId, meanings: res.data };
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to fetch meanings"
         );
      }
   }
);

// Create a new meaning
export const createMeaning = createAsyncThunk(
   "meanings/create",
   async ({ wordId, meaningData }, thunkAPI) => {
      try {
         const res = await API.post(`/words/${wordId}/meanings`, meaningData);
         return { wordId, meaning: res.data };
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to create meaning"
         );
      }
   }
);

// Update a meaning
export const updateMeaning = createAsyncThunk(
   "meanings/update",
   async ({ wordId, meaningId, meaningData }, thunkAPI) => {
      try {
         const res = await API.put(
            `/words/${wordId}/meanings/${meaningId}`,
            meaningData
         );
         return { wordId, meaning: res.data };
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to update meaning"
         );
      }
   }
);

// Delete a meaning
export const deleteMeaning = createAsyncThunk(
   "meanings/delete",
   async ({ wordId, meaningId }, thunkAPI) => {
      try {
         await API.delete(`/words/${wordId}/meanings/${meaningId}`);
         return { wordId, meaningId };
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to delete meaning"
         );
      }
   }
);
