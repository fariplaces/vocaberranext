import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================== ASYNC THUNKS ==================


// Exercises and Tests Actions

// Fetch all Exercises and Tests
export const fetchExercises = createAsyncThunk(
   "typing/fetchExercises",
   async (_, thunkAPI) => {
      try {
         const res = await axios.get("/api/typing/fetchExercises");
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to fetch Exercises"
         );
      }
   }
);


// Create a new Exercises and Tests
export const createExercise = createAsyncThunk(
   "typing/createExercise",
   async (formData, thunkAPI) => {
      try {
         const res = await axios.post(`/api/typing/createExercise`, formData);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to create Typing Record"
         );
      }
   }
);

// Update a Exercises and Tests
export const updateExercise = createAsyncThunk(
   "typing/updateExercise",
   async (payload, thunkAPI) => {
      try {
         const res = await axios.patch(`/api/typing/updateExercise`, payload);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to update Typing"
         );
      }
   }
);

// Delete a Exercises and Tests
export const deleteExercise = createAsyncThunk(
   "typing/deleteExercise",
   async (id, thunkAPI) => {
      try {
         const res = await axios.delete(`/api/typing/deleteExercise/${id}`);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to Delete Typing"
         );
      }
   }
);


// Lessons Actions

// Fetch all Lessons
export const fetchLessons = createAsyncThunk(
   "typing/fetchLessons",
   async (_, thunkAPI) => {
      try {
         const res = await axios.get("/api/typing/fetchLessons");
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to fetch Lessons"
         );
      }
   }
);
// Exercise Types Actions

// Fetch all Exercise Types
export const fetchExerciseTypes = createAsyncThunk(
   "typing/fetchExerciseTypes",
   async (_, thunkAPI) => {
      try {
         const res = await axios.get("/api/typing/fetchExerciseTypes");
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to fetch Lessons"
         );
      }
   }
);

// Duration Actions

// Fetch all Durations
export const fetchDurations = createAsyncThunk(
   "typing/fetchDurations",
   async (_, thunkAPI) => {
      try {
         const res = await axios.get("/api/typing/fetchDurations");
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to fetch Durations"
         );
      }
   }
);

// Typing Actions

// Fetch all Typing Records
export const fetchTypings = createAsyncThunk(
   "typing/fetchTypings",
   async (_, thunkAPI) => {
      try {
         const res = await axios.get("/api/typing/fetchTypings");
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to fetch Durations"
         );
      }
   }
);

// Create a new Typing
export const createTyping = createAsyncThunk(
   "typing/createTyping",
   async (formData, thunkAPI) => {
      try {
         const res = await axios.post(`/api/typing/createTyping`, formData);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to create Typing Record"
         );
      }
   }
);

// Update a Typing
export const updateTyping = createAsyncThunk(
   "typing/updateTyping",
   async (payload, thunkAPI) => {
      try {
         const res = await axios.patch(`/api/typing/updateTyping`, payload);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to update Typing"
         );
      }
   }
);

// Delete a Typing
export const deleteTyping = createAsyncThunk(
   "typing/deleteTyping",
   async (id, thunkAPI) => {
      try {
         const res = await axios.delete(`/api/typing/deleteTyping/${id}`);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to Delete Typing"
         );
      }
   }
);
