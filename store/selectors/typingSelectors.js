// @/store/selectors/typingSelectors.js
import { createSelector } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants/sliceConstants';
import { TYPING_KEYS } from '../constants/typingConstants';

// 1. The Foundation: Get the raw slice
export const selectTypingState = (state) => state[SLICE_NAMES.TYPING] || {};

/**
 * Metadata Selector with dynamic filtering
 * @param {string} route - "course", "test", or null
 * @param {string} durationFilter - Optional (e.g., "5M")
 */
export const selectTypingMetadata = createSelector(
   [
      selectTypingState,
      (state, route) => route,
      (state, route, durationFilter) => durationFilter
   ],
   (slice, route, durationFilter) => {
      // 1. Filter Lessons based on Route
      const allLessons = slice[TYPING_KEYS.LESSONS] || [];
      const filteredLessons = allLessons.filter((item) => {
         if (route === "course") return item.lesson !== "TEST";
         if (route === "test") return item.lesson === "TEST";
         return true; // "all"
      });

      // 2. Filter Durations based on durationFilter (if provided)
      const allDurations = slice[TYPING_KEYS.DURATIONS] || [];
      const filteredDurations = durationFilter
         ? allDurations.filter(d => d.duration === durationFilter)
         : allDurations;

      return {
         lessons: filteredLessons,
         durations: filteredDurations,
         loading: slice.loading,
         error: slice.error
      };
   }
);



// 3. Filtered Data Selector (For Tables)
export const selectFilteredTypings = createSelector(
   [
      selectTypingState,
      (state, route) => route
   ],
   (typingState, route) => {
      const typings = typingState[TYPING_KEYS.TYPINGS] || [];

      return typings.filter((item) => {
         const lessonName = item.exercise?.lesson?.lesson;

         if (route === "course") return lessonName !== "TEST";
         if (route === "test") return lessonName === "TEST";
         return true;
      });
   }
);