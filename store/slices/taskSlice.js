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




// @/store/slices/taskSlice.js
// import { createSlice } from "@reduxjs/toolkit";
// import * as actions from "../actions/taskActions";
// import { SLICE_NAMES } from "../constants/sliceConstants";
// import { TASKS_KEYS } from "../constants/tasksConstants";

// const taskSlice = createSlice({
//   name: SLICE_NAMES.TASKS,
//   initialState: {
//     [TASKS_KEYS.TASKS]: [],
//     [TASKS_KEYS.DEFAULT_TASKS]: [],
//     [TASKS_KEYS.LOADING]: false,
//     [TASKS_KEYS.ERROR]: null,
//   },
//   reducers: {
//     resetTaskingState: (state) => {
//       state[TASKS_KEYS.TASKS] = [];
//       state[TASKS_KEYS.DEFAULT_TASKS] = [];
//       state[TASKS_KEYS.LOADING] = false;
//       state[TASKS_KEYS.ERROR] = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // ================== DATA FETCHING ==================
//       .addCase(actions.fetchTasks.fulfilled, (state, action) => {
//         state[TASKS_KEYS.TASKS] = action.payload;
//       })
//       .addCase(actions.fetchDefaultTasks.fulfilled, (state, action) => {
//         state[TASKS_KEYS.DEFAULT_TASKS] = action.payload;
//       })

//       // ================== CREATION & IMPORT ==================
//       .addCase(actions.createTask.fulfilled, (state, action) => {
//         state[TASKS_KEYS.TASKS].unshift(action.payload);
//       })
//       .addCase(actions.createDefaultTask.fulfilled, (state, action) => {
//         state[TASKS_KEYS.DEFAULT_TASKS].unshift(action.payload);
//       })
//       .addCase(actions.bulkImportTask.fulfilled, (state, action) => {
//         // Spread the imported array at the start of the list
//         state[TASKS_KEYS.TASKS] = [...action.payload, ...state[TASKS_KEYS.TASKS]];
//       })

//       // ================== DYNAMIC UPDATES ==================
//       // This matcher handles BOTH updateTask and updateDefaultTask
//       .addMatcher(
//         (action) => action.type.startsWith(`${TASKS_KEYS.PREFIX}/update`) && action.type.endsWith("/fulfilled"),
//         (state, action) => {
//           const updated = action.payload;
//           const target = action.type.includes("Default") ? TASKS_KEYS.DEFAULT_TASKS : TASKS_KEYS.TASKS;
          
//           state[target] = state[target].map(item => item.id === updated.id ? updated : item);
//         }
//       )

//       // ================== DYNAMIC DELETES ==================
//       // This matcher handles BOTH deleteTask and deleteDefaultTask
//       .addMatcher(
//         (action) => action.type.startsWith(`${TASKS_KEYS.PREFIX}/delete`) && action.type.endsWith("/fulfilled"),
//         (state, action) => {
//           const id = action.meta.arg; // Using action argument (ID)
//           const target = action.type.includes("Default") ? TASKS_KEYS.DEFAULT_TASKS : TASKS_KEYS.TASKS;
          
//           state[target] = state[target].filter(item => item.id !== id);
//         }
//       )

//       // ============================================================
//       // GLOBAL STATE MATCHERS (Loading & Errors)
//       // ============================================================
//       .addMatcher(
//         (action) => action.type.startsWith(`${TASKS_KEYS.PREFIX}/`) && action.type.endsWith("/pending"),
//         (state) => {
//           state[TASKS_KEYS.LOADING] = true;
//           state[TASKS_KEYS.ERROR] = null;
//         }
//       )
//       .addMatcher(
//         (action) => 
//           action.type.startsWith(`${TASKS_KEYS.PREFIX}/`) && 
//           (action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")),
//         (state) => {
//           state[TASKS_KEYS.LOADING] = false;
//         }
//       )
//       .addMatcher(
//         (action) => action.type.startsWith(`${TASKS_KEYS.PREFIX}/`) && action.type.endsWith("/rejected"),
//         (state, action) => {
//           state[TASKS_KEYS.ERROR] = action.payload || "A task operation failed.";
//         }
//       );
//   },
// });

// export const { resetTaskingState } = taskSlice.actions;
// export default taskSlice.reducer;