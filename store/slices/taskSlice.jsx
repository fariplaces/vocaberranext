import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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



// ================== SLICE ==================

const taskSlice = createSlice({
  name: "Taskings",
  initialState: {
    tasks: [],
    defaultTasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetTaskingState: (state) => {
      state.tasks = [];
      state.defaultTasks = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = [action.payload, ...state.tasks];
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Bulk-import Task
      .addCase(bulkImportTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkImportTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = [...action.payload, ...state.tasks];
      })
      .addCase(bulkImportTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        // 1. Find the index of the record that was just updated
        const index = state.tasks.findIndex(
          (item) => item.id === action.payload.id
        );
        // 2. If found, replace the old object with the new one from the API
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(
          (item) => item.id !== action.meta.arg
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Default Tasks
      .addCase(fetchDefaultTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDefaultTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.defaultTasks = action.payload;
      })
      .addCase(fetchDefaultTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Default Task
      .addCase(createDefaultTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDefaultTask.fulfilled, (state, action) => {
        state.loading = false;
        state.defaultTasks = [action.payload, ...state.defaultTasks];
      })
      .addCase(createDefaultTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Default Task
      .addCase(updateDefaultTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDefaultTask.fulfilled, (state, action) => {
        state.loading = false;
        // 1. Find the index of the record that was just updated
        const index = state.defaultTasks.findIndex(
          (item) => item.id === action.payload.id
        );
        // 2. If found, replace the old object with the new one from the API
        if (index !== -1) {
          state.defaultTasks[index] = action.payload;
        }
      })
      .addCase(updateDefaultTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Default Task
      .addCase(deleteDefaultTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDefaultTask.fulfilled, (state, action) => {
        state.loading = false;
        state.defaultTasks = state.defaultTasks.filter(
          (item) => item.id !== action.meta.arg
        );
      })
      .addCase(deleteDefaultTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTaskingState } = taskSlice.actions;
export default taskSlice.reducer;
