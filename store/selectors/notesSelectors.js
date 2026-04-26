import { createSelector } from "@reduxjs/toolkit";
import { NOTES_KEYS } from "../constants/notesConstants";

// 1. Base Selector
export const selectNotesState = (state) => state.notes;

// 2. Individual Data Selectors
export const selectAllNotes = (state) => selectNotesState(state)[NOTES_KEYS.NOTES];
export const selectTargetNotes = (state) => selectNotesState(state)[NOTES_KEYS.TARGET_NOTES];
export const selectGlobalNotes = (state) => selectNotesState(state)[NOTES_KEYS.GLOBAL_NOTES];
export const selectActiveNote = (state) => selectNotesState(state)[NOTES_KEYS.ACTIVE_NOTE];
export const selectTemplates = (state) => selectNotesState(state)[NOTES_KEYS.TEMPLATES];

// 3. Status Selectors (Atomic)
export const selectNotesLoading = (state) => selectNotesState(state)[NOTES_KEYS.LOADING];
export const selectTemplateLoading = (state) => selectNotesState(state)[NOTES_KEYS.TEMPLATE_LOADING];
export const selectNotesError = (state) => selectNotesState(state)[NOTES_KEYS.ERROR];

// 4. Combined "Meta" Selector (For complex Views/Modals)
export const selectNotesMetaData = createSelector(
   [selectAllNotes, selectActiveNote, selectNotesLoading, selectNotesError],
   (notes, activeNote, loading, error) => ({
      notes,
      activeNote,
      loading,
      error,
      count: notes.length
   })
);

// 5. Advanced: Filtered Global Notes (Example of why selectors are powerful)
// This will only re-calculate if globalNotes OR the user search term changes
export const selectPublishedNotes = createSelector(
   [selectGlobalNotes],
   (globalNotes) => globalNotes.filter(note => note.isPublished)
);