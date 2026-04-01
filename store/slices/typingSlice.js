import { createSlice } from "@reduxjs/toolkit";
import { createExercise, createTyping, deleteExercise, deleteTyping, fetchDurations, fetchExercises, fetchExerciseTypes, fetchLessons, fetchTypings, updateExercise, updateTyping } from "../actions/typingActions";

const typingSlice = createSlice({
  name: "TypingDetails",
  initialState: {
    exercises: [],
    lessons: [],
    exerciseTypes: [],
    durations: [],
    typings: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetTypingState: (state) => {
      state.exercises = [];
      state.lessons = [];
      state.exerciseTypes = [];
      state.durations = [];
      state.typings = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Exercise Types
      .addCase(fetchExerciseTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExerciseTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.exerciseTypes = action.payload;
      })
      .addCase(fetchExerciseTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Lessons
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = action.payload;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Durations
      .addCase(fetchDurations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDurations.fulfilled, (state, action) => {
        state.loading = false;
        state.durations = action.payload;
      })
      .addCase(fetchDurations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Typing
      .addCase(fetchTypings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTypings.fulfilled, (state, action) => {
        state.loading = false;
        state.typings = action.payload;
      })
      .addCase(fetchTypings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Typing
      .addCase(createTyping.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTyping.fulfilled, (state, action) => {
        state.loading = false;
        state.typings = [action.payload, ...state.typings];
      })
      .addCase(createTyping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Typing
      .addCase(updateTyping.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTyping.fulfilled, (state, action) => {
        state.loading = false;
        // 1. Find the index of the record that was just updated
        const index = state.typings.findIndex(
          (item) => item.id === action.payload.id
        );
        // 2. If found, replace the old object with the new one from the API
        if (index !== -1) {
          state.typings[index] = action.payload;
        }
      })
      .addCase(updateTyping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Typing
      .addCase(deleteTyping.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTyping.fulfilled, (state, action) => {
        state.loading = false;
        state.typings = state.typings.filter(
          (item) => item.id !== action.meta.arg
        );
      })
      .addCase(deleteTyping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Exercises
      .addCase(fetchExercises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Exercise
      .addCase(createExercise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExercise.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = [action.payload, ...state.exercises];
      })
      .addCase(createExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Exercise
      .addCase(updateExercise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExercise.fulfilled, (state, action) => {
        state.loading = false;
        // 1. Find the index of the record that was just updated
        const index = state.exercises.findIndex(
          (item) => item.id === action.payload.id
        );
        // 2. If found, replace the old object with the new one from the API
        if (index !== -1) {
          state.exercises[index] = action.payload;
        }
      })
      .addCase(updateExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Exercise
      .addCase(deleteExercise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExercise.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = state.exercises.filter(
          (item) => item.id !== action.meta.arg
        );
      })
      .addCase(deleteExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTypingState } = typingSlice.actions;
export default typingSlice.reducer;
