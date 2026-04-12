import { createSlice } from "@reduxjs/toolkit";
import {
  createExercise, createTyping, deleteExercise, deleteTyping,
  fetchDurations, fetchExercises, fetchExerciseTypes,
  fetchLessons, fetchTypings, updateExercise, updateTyping
} from "../../actions/typingActions";
import { TYPING_KEYS } from "../../constants/typingConstants";
import { handlePaginatedFulfilled } from "../../utils/reduxHelpers";
import { SLICE_NAMES } from "../../constants/sliceConstants";

const initialState = {
  [TYPING_KEYS.EXERCISES]: [],
  [TYPING_KEYS.LESSONS]: [],
  [TYPING_KEYS.EXERCISE_TYPES]: [],
  [TYPING_KEYS.DURATIONS]: [],
  [TYPING_KEYS.TYPINGS]: [],
  [TYPING_KEYS.TYPING_PAGINATION]: { currentPage: 1, lastPage: 1, hasMore: true },
  [TYPING_KEYS.EXERCISE_PAGINATION]: { currentPage: 1, lastPage: 1, hasMore: true },
  loading: false,
  filterMode: "course",
  fetchingMore: false,
  error: null,
};

const typingSlice = createSlice({
  name: SLICE_NAMES.TYPING,
  initialState,
  reducers: {
    resetTypingState: () => ({ ...initialState }),
    setFilterMode: (state, action) => {
      state.filterMode = action.payload; // "course" or "test"
    },
  },
  extraReducers: (builder) => {
    builder

      //* --- PAGINATED FETCHES (Special Pending Logic) ---
      .addCase(fetchTypings.pending, (state, action) => {
        state.error = null;
        if (action.meta.arg?.page > 1) state.fetchingMore = true;
        else state.loading = true;
      })
      .addCase(fetchExercises.pending, (state, action) => {
        state.error = null;
        if (action.meta.arg?.page > 1) state.fetchingMore = true;
        else state.loading = true;
      })

      //* --- FULFILLED CASES (Using Helpers & Constants) ---
      .addCase(fetchTypings.fulfilled, (state, action) => {
        handlePaginatedFulfilled(state, action, TYPING_KEYS.TYPINGS, TYPING_KEYS.TYPING_PAGINATION);
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        handlePaginatedFulfilled(state, action, TYPING_KEYS.EXERCISES, TYPING_KEYS.EXERCISE_PAGINATION);
      })
      .addCase(fetchExerciseTypes.fulfilled, (state, action) => {
        state.loading = false;
        state[TYPING_KEYS.EXERCISE_TYPES] = action.payload;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state[TYPING_KEYS.LESSONS] = action.payload;
      })
      .addCase(fetchDurations.fulfilled, (state, action) => {
        state.loading = false;
        state[TYPING_KEYS.DURATIONS] = action.payload;
      })

      //* --- CRUD OPERATIONS ---
      .addCase(createTyping.fulfilled, (state, action) => {
        state.loading = false;
        state[TYPING_KEYS.TYPINGS] = [action.payload, ...state[TYPING_KEYS.TYPINGS]];
      })
      .addCase(updateTyping.fulfilled, (state, action) => {
        state.loading = false;
        const index = state[TYPING_KEYS.TYPINGS].findIndex(t => t.id === action.payload.id);
        if (index !== -1) state[TYPING_KEYS.TYPINGS][index] = action.payload;
      })
      .addCase(deleteTyping.fulfilled, (state, action) => {
        state.loading = false;
        state[TYPING_KEYS.TYPINGS] = state[TYPING_KEYS.TYPINGS].filter(t => t.id !== action.meta.arg);
      })
      .addCase(createExercise.fulfilled, (state, action) => {
        state.loading = false;
        state[TYPING_KEYS.EXERCISES] = [action.payload, ...state[TYPING_KEYS.EXERCISES]];
      })
      .addCase(updateExercise.fulfilled, (state, action) => {
        state.loading = false;
        const index = state[TYPING_KEYS.EXERCISES].findIndex(e => e.id === action.payload.id);
        if (index !== -1) state[TYPING_KEYS.EXERCISES][index] = action.payload;
      })
      .addCase(deleteExercise.fulfilled, (state, action) => {
        state.loading = false;
        state[TYPING_KEYS.EXERCISES] = state[TYPING_KEYS.EXERCISES].filter(e => e.id !== action.meta.arg);
      })

      //* --- GLOBAL PENDING MATCHER ---
      // Handles loading state for everything EXCEPT the two paginated fetches
      .addMatcher(
        (action) => action.type.endsWith("/pending") &&
          !action.type.includes("fetchTypings") &&
          !action.type.includes("fetchExercises"),
        (state) => { state.loading = true; state.error = null; }
      )

      //* --- GLOBAL REJECTED MATCHER ---
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.fetchingMore = false;
          state.error = action.payload || "An unexpected error occurred";
        }
      );
  },
});

export const { resetTypingState, setFilterMode } = typingSlice.actions;
export default typingSlice.reducer;