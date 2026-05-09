import { createSelector } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../constants/sliceConstants";
import { TYPING_KEYS } from "../constants/typingConstants";

/**
 * ENTERPRISE PATTERN: Constant Defaults
 * Using Object.freeze ensures that no developer can accidentally
 * push to or modify these default values, which would corrupt the state globally.
 */
const EMPTY_ARRAY = Object.freeze([]);
const DEFAULT_PAGINATION = Object.freeze({
  currentPage: 1,
  lastPage: 1,
  hasMore: false,
  isFetchingMore: false,
});

// --- Base Selectors ---

// 1. Root Slice Selector
export const selectTypingState = (state) => state[SLICE_NAMES.TYPING] || {};

// 2. Memoized Collection Selectors
// We use the frozen EMPTY_ARRAY to ensure [].filter() doesn't create new refs on null data
export const selectAllTypings = createSelector(
  [selectTypingState],
  (typing) => typing[TYPING_KEYS.TYPINGS] || EMPTY_ARRAY,
);

export const selectAllExercises = createSelector(
  [selectTypingState],
  (typing) => typing[TYPING_KEYS.EXERCISES] || EMPTY_ARRAY,
);

export const selectAllLessons = createSelector(
  [selectTypingState],
  (typing) => typing[TYPING_KEYS.LESSONS] || EMPTY_ARRAY,
);

export const selectAllDurations = createSelector(
  [selectTypingState],
  (typing) => typing[TYPING_KEYS.DURATIONS] || EMPTY_ARRAY,
);

export const selectAllExerciseTypes = createSelector(
  [selectTypingState],
  (typing) => typing[TYPING_KEYS.EXERCISE_TYPES] || EMPTY_ARRAY,
);

// --- State & Status Selectors ---

// Primitives (strings/bools/null) are safe for direct selection
export const selectFilterMode = (state) => selectTypingState(state).filterMode;
export const selectTypingLoading = (state) => selectTypingState(state).loading;
export const selectTypingError = (state) => selectTypingState(state).error;

// --- Pagination Selectors ---

export const selectTypingPagination = createSelector(
  [selectTypingState],
  (typing) => typing[TYPING_KEYS.TYPING_PAGINATION] || DEFAULT_PAGINATION,
);

export const selectExercisePagination = createSelector(
  [selectTypingState],
  (typing) => typing[TYPING_KEYS.EXERCISE_PAGINATION] || DEFAULT_PAGINATION,
);

// Memoizing these prevents unnecessary re-renders in components using these flags
export const selectIsFetchingMoreTyping = createSelector(
  [selectTypingPagination],
  (pagination) => pagination.isFetchingMore,
);

export const selectIsFetchingMoreExercise = createSelector(
  [selectExercisePagination],
  (pagination) => pagination.isFetchingMore,
);

// --- Smart Business Logic Selectors ---

/**
 * 1. Filtered Typings (History Table)
 * Handles safety checks for nested objects (exercise?.lesson)
 */
export const selectFilteredTypings = createSelector(
  [selectAllTypings, selectFilterMode],
  (typings, mode) => {
    if (!mode) return typings;
    return typings.filter((item) => {
      const lessonName = item.exercise?.lesson?.lesson || "";
      const isTest = lessonName.toUpperCase() === "TEST";
      return mode === "course" ? !isTest : isTest;
    });
  },
);

/**
 * 2. Filtered Exercises (Form Dropdowns)
 */
export const selectFilteredExercises = createSelector(
  [selectAllExercises, selectFilterMode],
  (exercises, mode) => {
    if (!mode) return exercises;
    return exercises.filter((ex) => {
      const isTest = ex.lesson?.lesson?.toUpperCase() === "TEST";
      return mode === "course" ? !isTest : isTest;
    });
  },
);

/**
 * 3. Unified Metadata Selector
 * This is perfect for forms. By memoizing the whole object,
 * components using this won't re-render unless one of the inputs changes.
 */
export const selectTypingMetadata = createSelector(
  [
    selectAllLessons,
    selectAllDurations,
    selectAllExerciseTypes,
    selectFilterMode,
  ],
  (lessons, durations, types, mode) => {
    const filteredLessons = lessons.filter((item) => {
      const isTest = item.lesson?.toUpperCase() === "TEST";
      if (mode === "course") return !isTest;
      if (mode === "test") return isTest;
      return true;
    });

    return {
      lessons: filteredLessons,
      durations,
      exerciseTypes: types,
      mode,
    };
  },
);
