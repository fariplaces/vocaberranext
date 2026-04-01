import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all words
export const fetchWords = createAsyncThunk(
   "words/fetchAll",
   async (_, thunkAPI) => {
      try {
         const res = await axios.get("/words");
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to fetch words"
         );
      }
   }
);

// Create a new word
export const createWord = createAsyncThunk(
   "words/create",
   async (wordData, thunkAPI) => {
      try {
         const res = await axios.post("/words", wordData);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to create word"
         );
      }
   }
);

// Update a word
export const updateWord = createAsyncThunk(
   "words/update",
   async ({ id, wordData }, thunkAPI) => {
      try {
         const res = await axios.put(`/words/${id}`, wordData);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to update word"
         );
      }
   }
);

// Delete a word
export const deleteWord = createAsyncThunk(
   "words/delete",
   async (id, thunkAPI) => {
      try {
         await axios.delete(`/words/${id}`);
         return id;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to delete word"
         );
      }
   }
);