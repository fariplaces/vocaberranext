import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================== ASYNC THUNKS ==================


// Tasks Actions

// Fetch all Tasks
export const fetchTasks = createAsyncThunk(
   "tasks/fetchTasks",
   async (_, thunkAPI) => {
      try {
         const res = await axios.get("/api/tasks/fetchTasks");
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to fetch Tasks"
         );
      }
   }
);


// Create a new Task
export const createTask = createAsyncThunk(
   "tasks/createTask",
   async (formData, thunkAPI) => {
      try {
         const res = await axios.post(`/api/tasks/createTask`, formData);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to create Task"
         );
      }
   }
);
// Bulk-Import Tasks
export const bulkImportTask = createAsyncThunk(
   "tasks/bulkImportTask",
   async (formData, thunkAPI) => {
      try {
         // Ensure your backend endpoint matches this exactly
         const res = await axios.post(`/api/tasks/bulkImportTask`, formData);

         // If your backend returns the array of tasks directly:
         return res.data;

      } catch (error) {
         // Pulling the specific error message from your API response
         const errorMessage = error.response?.data?.error ||
            error.response?.data?.message ||
            "Failed to import Tasks";

         return thunkAPI.rejectWithValue(errorMessage);
      }
   }
);

// Update a Task
export const updateTask = createAsyncThunk(
   "tasks/updateTask",
   async (payload, thunkAPI) => {
      try {
         const res = await axios.patch(`/api/tasks/updateTask`, payload);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to update Task"
         );
      }
   }
);

// Delete a Task
export const deleteTask = createAsyncThunk(
   "tasks/deleteTask",
   async (id, thunkAPI) => {
      try {
         const res = await axios.delete(`/api/tasks/deleteTask/${id}`);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to Delete Task"
         );
      }
   }
);

// Fetch all Default Tasks
export const fetchDefaultTasks = createAsyncThunk(
   "tasks/fetchDefaultTasks",
   async (_, thunkAPI) => {
      try {
         const res = await axios.get("/api/tasks/fetchDefaultTasks");
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to fetch Default Tasks"
         );
      }
   }
);


// Create a new Default Task
export const createDefaultTask = createAsyncThunk(
   "tasks/createDefaultTask",
   async (formData, thunkAPI) => {
      try {
         const res = await axios.post(`/api/tasks/createDefaultTask`, formData);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to create Task"
         );
      }
   }
);

// Update a Default Task
export const updateDefaultTask = createAsyncThunk(
   "tasks/updateDefaultTask",
   async (payload, thunkAPI) => {
      try {
         const res = await axios.patch(`/api/tasks/updateDefaultTask`, payload);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to update Default Task"
         );
      }
   }
);

// Delete a Default Task
export const deleteDefaultTask = createAsyncThunk(
   "tasks/deleteDefaultTask",
   async (id, thunkAPI) => {
      try {
         const res = await axios.delete(`/api/tasks/deleteDefaultTask/${id}`);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to Delete Default Task"
         );
      }
   }
);

