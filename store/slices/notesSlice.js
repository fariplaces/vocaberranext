import { createSlice } from "@reduxjs/toolkit";
import { createNote, createTemplate, deleteNote, deleteTemplate, fetchGlobalNotes, fetchNoteById, fetchNotes, fetchNotesByTarget, fetchTemplates, importNote, linkNote, publishNote, unlinkNote, unpublishNote, updateNote, updateTemplate } from "../actions/notesActions";
import { SLICE_NAMES } from "../constants/sliceConstants";

const notesSlice = createSlice({
   name: SLICE_NAMES.NOTES,
   initialState: {
      notes: [],
      targetNotes: [],
      globalNotes: [],
      activeNote: null,
      templates: [],
      loading: false,
      templateLoading: false,
      error: null,
   },
   reducers: {
      setActiveNote: (state, action) => {
         state.activeNote = action.payload;
      },
      clearActiveNote: (state) => {
         state.activeNote = null;
      },
      clearTargetNotes: (state) => {
         state.targetNotes = [];
      },
      clearError: (state) => {
         state.error = null;
      },
   },

   extraReducers: (builder) => {
      // ---- helper to reduce boilerplate ----
      const loading = (state) => {
         state.loading = true;
         state.error = null;
      };
      const failed = (state, action) => {
         state.loading = false;
         state.error = action.payload?.message || "Something went wrong";
      };

      builder
         // ---- fetchNotes ----
         .addCase(fetchNotes.pending, loading)
         .addCase(fetchNotes.fulfilled, (state, action) => {
            state.loading = false;
            state.notes = action.payload;
         })
         .addCase(fetchNotes.rejected, failed)

         // ---- fetchNotesByTarget ----
         .addCase(fetchNotesByTarget.pending, loading)
         .addCase(fetchNotesByTarget.fulfilled, (state, action) => {
            state.loading = false;
            state.targetNotes = action.payload;
         })
         .addCase(fetchNotesByTarget.rejected, failed)

         // ---- fetchNoteById ----
         .addCase(fetchNoteById.pending, loading)
         .addCase(fetchNoteById.fulfilled, (state, action) => {
            state.loading = false;
            state.activeNote = action.payload;
         })
         .addCase(fetchNoteById.rejected, failed)

         // ---- fetchGlobalNotes ----
         .addCase(fetchGlobalNotes.pending, loading)
         .addCase(fetchGlobalNotes.fulfilled, (state, action) => {
            state.loading = false;
            state.globalNotes = action.payload;
         })
         .addCase(fetchGlobalNotes.rejected, failed)

         // ---- createNote ----
         .addCase(createNote.pending, loading)
         .addCase(createNote.fulfilled, (state, action) => {
            state.loading = false;
            state.notes.unshift(action.payload);
            state.activeNote = action.payload;
         })
         .addCase(createNote.rejected, failed)

         // ---- updateNote ----
         .addCase(updateNote.pending, loading)
         .addCase(updateNote.fulfilled, (state, action) => {
            state.loading = false;
            const updated = action.payload;
            // update in notes list
            state.notes = state.notes.map((n) =>
               n.id === updated.id ? updated : n
            );
            // update in targetNotes list
            state.targetNotes = state.targetNotes.map((n) =>
               n.id === updated.id ? updated : n
            );
            // update active note if it's the same one
            if (state.activeNote?.id === updated.id) {
               state.activeNote = updated;
            }
         })
         .addCase(updateNote.rejected, failed)

         // ---- deleteNote ----
         .addCase(deleteNote.pending, loading)
         .addCase(deleteNote.fulfilled, (state, action) => {
            state.loading = false;
            const id = action.payload;
            state.notes = state.notes.filter((n) => n.id !== id);
            state.targetNotes = state.targetNotes.filter((n) => n.id !== id);
            if (state.activeNote?.id === id) state.activeNote = null;
         })
         .addCase(deleteNote.rejected, failed)

         // ---- linkNote ----
         .addCase(linkNote.fulfilled, (state, action) => {
            const updated = action.payload;
            state.notes = state.notes.map((n) =>
               n.id === updated.id ? updated : n
            );
            if (state.activeNote?.id === updated.id) state.activeNote = updated;
         })

         // ---- unlinkNote ----
         .addCase(unlinkNote.fulfilled, (state, action) => {
            const updated = action.payload;
            state.notes = state.notes.map((n) =>
               n.id === updated.id ? updated : n
            );
            state.targetNotes = state.targetNotes.filter(
               (n) => n.id !== updated.id
            );
            if (state.activeNote?.id === updated.id) state.activeNote = updated;
         })

         // ---- publishNote ----
         .addCase(publishNote.fulfilled, (state, action) => {
            const updated = action.payload;
            state.notes = state.notes.filter((n) => n.id !== updated.id);
            state.globalNotes.unshift(updated);
            if (state.activeNote?.id === updated.id) state.activeNote = updated;
         })

         // ---- unpublishNote ----
         .addCase(unpublishNote.fulfilled, (state, action) => {
            const updated = action.payload;
            state.globalNotes = state.globalNotes.filter(
               (n) => n.id !== updated.id
            );
            state.notes.unshift(updated);
            if (state.activeNote?.id === updated.id) state.activeNote = updated;
         })

         // ---- importNote ----
         .addCase(importNote.fulfilled, (state, action) => {
            state.notes.unshift(action.payload);
            state.activeNote = action.payload;
         })

         // ---- fetchTemplates ----
         .addCase(fetchTemplates.pending, (state) => {
            state.templateLoading = true;
         })
         .addCase(fetchTemplates.fulfilled, (state, action) => {
            state.templateLoading = false;
            state.templates = action.payload;
         })
         .addCase(fetchTemplates.rejected, (state, action) => {
            state.templateLoading = false;
            state.error = action.payload?.message || "Something went wrong";
         })

         // ---- createTemplate ----
         .addCase(createTemplate.fulfilled, (state, action) => {
            state.templates.push(action.payload);
         })

         // ---- updateTemplate ----
         .addCase(updateTemplate.fulfilled, (state, action) => {
            const updated = action.payload;
            state.templates = state.templates.map((t) =>
               t.id === updated.id ? updated : t
            );
         })

         // ---- deleteTemplate ----
         .addCase(deleteTemplate.fulfilled, (state, action) => {
            state.templates = state.templates.filter(
               (t) => t.id !== action.payload
            );
         });
   },
});

export const { setActiveNote, clearActiveNote, clearTargetNotes, clearError } =
   notesSlice.actions;

export default notesSlice.reducer;




// fetch all personal notes
// dispatch(fetchNotes())

// fetch notes for a topic page
// dispatch(fetchNotesByTarget({ targetId: topic.id, targetType: "TOPIC" }))

// create a new blank note
// dispatch(createNote({ title: "Untitled" }))

// save editor content
// dispatch(updateNote({ id: note.id, content: JSON.stringify(editor.document) }))

// link a note to a topic
// dispatch(linkNote({ id: note.id, targetId: topic.id, targetType: "TOPIC" }))

// unlink
// dispatch(unlinkNote(note.id))

// publish to global
// dispatch(publishNote(note.id))

// import by share code
// dispatch(importNote({ shareCode: "NOTE-A3X9K", targetId: topic.id, targetType: "TOPIC" }))

// fetch templates for slash menu
// dispatch(fetchTemplates())

// create a user template
// dispatch(createTemplate({ name: "Daily Reflection", pattern: "daily", content: JSON.stringify(...) }))