import { createSelector } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../constants/sliceConstants";
import { TYPING_FORM_KEYS } from "../constants/typingConstants";
import { selectFilterMode, selectAllLessons, selectAllDurations } from "./typingSelectors"; // Import from your main typing selectors


// 1. Base Selector for this slice
export const selectTypingFormState = (state) => state[SLICE_NAMES.TYPING_FORM];

// 2. Base Selector for the manage popup object
export const selectManagePopup = (state) => selectTypingFormState(state)[TYPING_FORM_KEYS.MANAGE_POPUP];


export const selectIsManageOpen = (state) => selectManagePopup(state)[TYPING_FORM_KEYS.IS_OPEN];

export const selectEditId = (state) => selectManagePopup(state)[TYPING_FORM_KEYS.EDIT_ID];

export const selectTypingFormData = (state) => selectManagePopup(state)[TYPING_FORM_KEYS.FORM_DATA];

// Boolean to check if we are in "Edit Mode" or "Add Mode"
export const selectIsEditMode = createSelector(
   [selectEditId],
   (editId) => !!editId
);

// --- Delete Popup Selectors ---
export const selectDeletePopup = (state) => selectTypingFormState(state)[TYPING_FORM_KEYS.DELETE_POPUP];

export const selectIsDeleteOpen = (state) => selectDeletePopup(state)[TYPING_FORM_KEYS.IS_OPEN];

export const selectDeleteItem = (state) => selectDeletePopup(state).item;


// 3. The "Self-Feeding" Meta Selector
// export const selectManagePopupMeta = createSelector(
//    [
//       selectManagePopup,
//       selectFilterMode,  // <--- Automatically pulls from state.typing.filterMode
//       selectAllLessons,
//       selectAllDurations
//    ],
//    (manage, route, allLessons, allDurations) => {
//       const { isOpen, formData, editId } = manage;
//       const isEditMode = !!editId;

//       // 4. Filter the lessons for the dropdown right here!
//       const filteredLessons = allLessons.filter((item) => {
//          if (route === "test") return item.lesson === "TEST";
//          if (route === "course") return item.lesson !== "TEST";
//          return true;
//       });

//       return {
//          isOpen,
//          isEditMode,
//          formData,
//          route, // Pass it through so the UI can use it for labels
//          lessons: filteredLessons,
//          durations: allDurations,
//          title: isEditMode ? "Update Record" : "Add New Record"
//       };
//    }
// );

// store/selectors/typingFormSelectors.js
export const selectManagePopupMeta = createSelector(
   [selectManagePopup, selectFilterMode, selectAllLessons, selectAllDurations],
   (manage, route, allLessons, allDurations) => {
      // Accessing state via dynamic constants
      // const isOpen = manage[TYPING_FORM_KEYS.IS_OPEN];
      // const editId = manage[TYPING_FORM_KEYS.EDIT_ID]; // This is the value from the slice
      // const formData = manage[TYPING_FORM_KEYS.FORM_DATA];
      const { isOpen, formData, editId } = manage;
      const isEditMode = !!editId;
      // 4. Filter the lessons for the dropdown right here!
      const filteredLessons = allLessons.filter((item) => {
         if (route === "test") return item.lesson === "TEST";
         if (route === "course") return item.lesson !== "TEST";
         return true;
      });


      return {
         isOpen,
         editId, // This will now be available as a simple variable in the component
         formData,
         isEditMode,
         route, // Pass it through so the UI can use it for labels
         lessons: filteredLessons,
         durations: allDurations,
         title: isEditMode ? "Update Record" : "Add New Record"
      };
   }
);