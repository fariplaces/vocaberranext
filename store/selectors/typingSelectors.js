import { createSelector } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants/sliceConstants';
import { TYPING_KEYS } from '../constants/typingConstants';

// --- Base Selectors ---
export const selectTypingState = (state) => state[SLICE_NAMES.TYPING] || {};

export const selectAllTypings = (state) => selectTypingState(state)[TYPING_KEYS.TYPINGS] || [];
export const selectAllExercises = (state) => selectTypingState(state)[TYPING_KEYS.EXERCISES] || [];
export const selectAllLessons = (state) => selectTypingState(state)[TYPING_KEYS.LESSONS] || [];
export const selectAllDurations = (state) => selectTypingState(state)[TYPING_KEYS.DURATIONS] || [];

export const selectFilterMode = (state) => selectTypingState(state).filterMode;

// --- Status & Pagination Selectors ---
export const selectTypingLoading = (state) => selectTypingState(state).loading;
export const selectTypingError = (state) => selectTypingState(state).error;

export const selectTypingPagination = (state) => selectTypingState(state)[TYPING_KEYS.TYPING_PAGINATION];
export const selectExercisePagination = (state) => selectTypingState(state)[TYPING_KEYS.EXERCISE_PAGINATION];

// Helper to pull nested fetching flags
export const selectFetchingMoreTyping = (state) => selectTypingPagination(state)?.isFetchingMore;
export const selectFetchingMoreExercise = (state) => selectExercisePagination(state)?.isFetchingMore;

// --- Smart Memoized Selectors ---

/**
 * 1. Filtered Typings (For History Table)
 * Automatically syncs with state.filterMode
 */
export const selectFilteredTypings = createSelector(
   [selectAllTypings, selectFilterMode],
   (typings, mode) => {
      return typings.filter((item) => {
         const lessonName = item.exercise?.lesson?.lesson;
         if (mode === "course") return lessonName !== "TEST";
         if (mode === "test") return lessonName === "TEST";
         return true;
      });
   }
);

/**
 * 2. Filtered Exercises (For the Add/Edit form dropdowns)
 * Automatically syncs with state.filterMode
 */
export const selectFilteredExercises = createSelector(
   [selectAllExercises, selectFilterMode],
   (exercises, mode) => {
      return exercises.filter((ex) => {
         // Assuming your exercise data includes the lesson type
         const isTest = ex.lesson?.lesson === "TEST";
         return mode === "course" ? !isTest : isTest;
      });
   }
);

/**
 * 3. Metadata Selector
 * Returns filtered lessons and durations based on state
 */
export const selectTypingMetadata = createSelector(
   [selectAllLessons, selectAllDurations, selectFilterMode, selectTypingLoading],
   (lessons, durations, mode, loading) => {
      const filteredLessons = lessons.filter((item) => {
         if (mode === "course") return item.lesson !== "TEST";
         if (mode === "test") return item.lesson === "TEST";
         return true;
      });

      return {
         lessons: filteredLessons,
         durations, // Usually, durations apply to both modes
         loading
      };
   }
);