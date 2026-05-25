// store/selectors/typingFormSelectors.js
import { createSelector } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../../constants/sliceConstants";
import {
  selectAllLessons,
  selectAllDurations,
  selectAllExerciseTypes,
  selectAllExercises,
  selectFilterMode,
} from "../typingSelectors";
import {
  FORM_DOMAINS,
  TYPING_KEYS,
  UI_KEYS,
} from "../../constants/typingConstants";

// 1. Base Selector for the whole slice
export const selectTypingFormState = (state) => state[SLICE_NAMES.TYPING_FORM];

/**
 * 2. Dynamic Factory Selectors
 * These take a 'formType' argument ('typings' or 'exercises')
 */
export const selectFormByType = (state, formType) =>
  selectTypingFormState(state)[formType];

export const selectManagePopup = (state, formType) =>
  selectFormByType(state, formType)[UI_KEYS.MANAGE_POPUP];

export const selectDeletePopup = (state, formType) =>
  selectFormByType(state, formType)[UI_KEYS.DELETE_POPUP];

/**
 * 3. The Meta Selectors (Unified for UI)
 * Use these in your components to get everything in one object.
 */

// Meta Selector for TYPING RESULTS (Practice/Results)
export const selectTypingResultMeta = createSelector(
  [
    (state) => selectManagePopup(state, "typings"),
    selectFilterMode,
    selectAllDurations,
    selectAllLessons,
  ],
  (manage, route, allDurations, lessons) => {
    const { isOpen, formData, editId } = manage;
    const isEditMode = !!editId;

    // Logic: Filter lessons based on current route (Course vs Test)
    const filteredLessons = lessons.filter((item) => {
      const isTest = item.lesson?.toUpperCase() === "TEST";
      return route === "test" ? isTest : !isTest;
    });

    return {
      isOpen,
      editId,
      formData,
      route,
      lessons: filteredLessons,
      isEditMode,
      durations: allDurations,
      title: isEditMode ? "Update Typing Result" : "Log New Typing Practice",
    };
  },
);

// Meta Selector for EXERCISES (Admin/Management)
export const selectExerciseFormMeta = createSelector(
  [
    (state) => selectManagePopup(state, FORM_DOMAINS.EXERCISES),
    selectFilterMode,
    selectAllLessons,
    selectAllDurations,
    selectAllExerciseTypes,
    selectAllExercises,
  ],
  (manage, route, allLessons, durations, allTypes, exercises) => {
    const { isOpen, formData, editId } = manage;
    const isEditMode = !!editId;

    // Logic: Filter lessons based on current route (Course vs Test)
    const filteredLessons = allLessons.filter((item) => {
      if (route === "test") return item.lesson === "TEST";
      if (route === "course") return item.lesson !== "TEST";
      return true;
    });

    if (route === "test") {
      // For tests, we only want exercise types that are relevant to tests
      allTypes = allTypes.filter((type) => type.type === "Test");
    }

    if (route === "course") {
      // For course, we only want exercise types that are relevant to course
      allTypes = allTypes.filter((type) => type.type !== "Test");
    }

    return {
      isOpen,
      editId,
      formData,
      isEditMode,
      route,
      lessons: filteredLessons,
      exerciseTypes: allTypes,
      durations,
      exercises,
      title: isEditMode ? "Edit Exercise" : "Create New Exercise",
    };
  },
);

// 4. Delete Popup Meta
export const selectDeletePopupMeta = (state, formType) => {
  const deletePopup = selectDeletePopup(state, formType);
  return {
    isOpen: deletePopup[UI_KEYS.IS_OPEN], // Use UI_KEYS
    item: deletePopup.item,
    formType,
  };
};
