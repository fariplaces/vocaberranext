import { createSlice } from "@reduxjs/toolkit";
import {
  createNote,
  createTemplate,
  deleteNote,
  deleteTemplate,
  fetchGlobalNotes,
  fetchNoteById,
  fetchNotes,
  fetchNotesByTarget,
  fetchTemplates,
  importNote,
  linkNote,
  publishNote,
  unlinkNote,
  unpublishNote,
  updateNote,
  updateTemplate,
} from "../actions/notesActions";
import { SLICE_NAMES } from "../constants/sliceConstants";
import { NOTES_KEYS } from "../constants/notesConstants";

const notesSlice = createSlice({
  name: SLICE_NAMES.NOTES,
  initialState: {
    [NOTES_KEYS.NOTES]: [],
    [NOTES_KEYS.TARGET_NOTES]: [],
    [NOTES_KEYS.GLOBAL_NOTES]: [],
    [NOTES_KEYS.ACTIVE_NOTE]: null,
    [NOTES_KEYS.TEMPLATES]: [],
    [NOTES_KEYS.LOADING]: false,
    [NOTES_KEYS.TEMPLATE_LOADING]: false,
    [NOTES_KEYS.ERROR]: null,
  },
  reducers: {
    setActiveNote: (state, action) => {
      state[NOTES_KEYS.ACTIVE_NOTE] = action.payload;
    },
    clearActiveNote: (state) => {
      state[NOTES_KEYS.ACTIVE_NOTE] = null;
    },
    clearTargetNotes: (state) => {
      state[NOTES_KEYS.TARGET_NOTES] = [];
    },
    clearError: (state) => {
      state[NOTES_KEYS.ERROR] = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ---- Note Fetches ----
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state[NOTES_KEYS.NOTES] = action.payload;
      })
      .addCase(fetchNotesByTarget.fulfilled, (state, action) => {
        state[NOTES_KEYS.TARGET_NOTES] = action.payload;
      })
      .addCase(fetchNoteById.fulfilled, (state, action) => {
        state[NOTES_KEYS.ACTIVE_NOTE] = action.payload;
      })
      .addCase(fetchGlobalNotes.fulfilled, (state, action) => {
        state[NOTES_KEYS.GLOBAL_NOTES] = action.payload;
      })

      // ---- Note CRUD & Actions ----
      .addCase(createNote.fulfilled, (state, action) => {
        state[NOTES_KEYS.NOTES].unshift(action.payload);
        state[NOTES_KEYS.ACTIVE_NOTE] = action.payload;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const updated = action.payload;
        const updateFn = (n) => (n.id === updated.id ? updated : n);

        state[NOTES_KEYS.NOTES] = state[NOTES_KEYS.NOTES].map(updateFn);
        state[NOTES_KEYS.TARGET_NOTES] =
          state[NOTES_KEYS.TARGET_NOTES].map(updateFn);

        if (state[NOTES_KEYS.ACTIVE_NOTE]?.id === updated.id) {
          state[NOTES_KEYS.ACTIVE_NOTE] = updated;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const id = action.payload;
        const filterFn = (n) => n.id !== id;

        state[NOTES_KEYS.NOTES] = state[NOTES_KEYS.NOTES].filter(filterFn);
        state[NOTES_KEYS.TARGET_NOTES] =
          state[NOTES_KEYS.TARGET_NOTES].filter(filterFn);

        if (state[NOTES_KEYS.ACTIVE_NOTE]?.id === id) {
          state[NOTES_KEYS.ACTIVE_NOTE] = null;
        }
      })

      // ---- Publishing & Linking ----
      .addCase(publishNote.fulfilled, (state, action) => {
        const updated = action.payload;
        state[NOTES_KEYS.NOTES] = state[NOTES_KEYS.NOTES].filter(
          (n) => n.id !== updated.id
        );
        state[NOTES_KEYS.GLOBAL_NOTES].unshift(updated);
      })
      .addCase(unpublishNote.fulfilled, (state, action) => {
        const updated = action.payload;
        state[NOTES_KEYS.GLOBAL_NOTES] = state[NOTES_KEYS.GLOBAL_NOTES].filter(
          (n) => n.id !== updated.id
        );
        state[NOTES_KEYS.NOTES].unshift(updated);
      })

      // ---- Templates ----
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state[NOTES_KEYS.TEMPLATES] = action.payload;
      })
      .addCase(createTemplate.fulfilled, (state, action) => {
        state[NOTES_KEYS.TEMPLATES].push(action.payload);
      })

      // ============================================================
      // DYNAMIC MATCHERS (The Enterprise Core)
      // ============================================================

      // Global Pending Matcher
      .addMatcher(
        (action) =>
          action.type.startsWith(`${NOTES_KEYS.PREFIX}/`) &&
          action.type.endsWith("/pending"),
        (state, action) => {
          state[NOTES_KEYS.ERROR] = null;
          if (action.type.includes("Template")) {
            state[NOTES_KEYS.TEMPLATE_LOADING] = true;
          } else {
            state[NOTES_KEYS.LOADING] = true;
          }
        }
      )

      // Global Success Matcher (Turn off all loadings)
      .addMatcher(
        (action) =>
          action.type.startsWith(`${NOTES_KEYS.PREFIX}/`) &&
          action.type.endsWith("/fulfilled"),
        (state) => {
          state[NOTES_KEYS.LOADING] = false;
          state[NOTES_KEYS.TEMPLATE_LOADING] = false;
        }
      )

      // Global Rejected Matcher
      .addMatcher(
        (action) =>
          action.type.startsWith(`${NOTES_KEYS.PREFIX}/`) &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state[NOTES_KEYS.LOADING] = false;
          state[NOTES_KEYS.TEMPLATE_LOADING] = false;
          state[NOTES_KEYS.ERROR] =
            action.payload || "An error occurred in the Notes module";
        }
      );
  },
});

export const { setActiveNote, clearActiveNote, clearTargetNotes, clearError } =
  notesSlice.actions;
export default notesSlice.reducer;
