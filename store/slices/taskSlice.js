import { createSlice } from "@reduxjs/toolkit";
import { bulkImportTask, createDefaultTask, createTask, deleteDefaultTask, deleteTask, fetchDefaultTasks, fetchTasks, updateDefaultTask, updateTask } from "../actions/taskActions";
import { SLICE_NAMES } from "../constants/sliceConstants";

const taskSlice = createSlice({
  name: SLICE_NAMES.TASKS,
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
