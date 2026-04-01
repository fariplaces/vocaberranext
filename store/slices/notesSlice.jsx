import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ============================================================
// THUNKS — NOTES
// ============================================================

export const fetchNotes = createAsyncThunk(
   "notes/fetchAll",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axios.get("/api/notes");
         return data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const fetchNotesByTarget = createAsyncThunk(
   "notes/fetchByTarget",
   async ({ targetId, targetType }, { rejectWithValue }) => {
      try {
         const { data } = await axios.get("/api/notes/target", {
            params: { targetId, targetType },
         });
         return data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const fetchNoteById = createAsyncThunk(
   "notes/fetchById",
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await axios.get(`/api/notes/${id}`);
         return data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const createNote = createAsyncThunk(
   "notes/create",
   async (payload, { rejectWithValue }) => {
      try {
         const { data } = await axios.post("/api/notes", payload);
         return data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const updateNote = createAsyncThunk(
   "notes/update",
   async ({ id, ...payload }, { rejectWithValue }) => {
      try {
         const { data } = await axios.patch(`/api/notes/${id}`, payload);
         return data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const deleteNote = createAsyncThunk(
   "notes/delete",
   async (id, { rejectWithValue }) => {
      try {
         await axios.delete(`/api/notes/${id}`);
         return id;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const linkNote = createAsyncThunk(
   "notes/link",
   async ({ id, targetId, targetType }, { rejectWithValue }) => {
      try {
         const { data } = await axios.patch(`/api/notes/${id}/link`, {
            targetId,
            targetType,
         });
         return data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const unlinkNote = createAsyncThunk(
   "notes/unlink",
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await axios.patch(`/api/notes/${id}/unlink`);
         return data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const publishNote = createAsyncThunk(
   "notes/publish",
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await axios.patch(`/api/notes/${id}/publish`);
         return data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const unpublishNote = createAsyncThunk(
   "notes/unpublish",
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await axios.patch(`/api/notes/${id}/unpublish`);
         return data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const importNote = createAsyncThunk(
   "notes/import",
   async ({ shareCode, targetId, targetType }, { rejectWithValue }) => {
      try {
         const { data } = await axios.post("/api/notes/import", {
            shareCode,
            targetId,
            targetType,
         });
         return data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const fetchGlobalNotes = createAsyncThunk(
   "notes/fetchGlobal",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axios.get("/api/notes/global");
         return data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

// ============================================================
// THUNKS — TEMPLATES
// ============================================================

export const fetchTemplates = createAsyncThunk(
   "notes/fetchTemplates",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axios.get("/api/notes/templates");
         return data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const createTemplate = createAsyncThunk(
   "notes/createTemplate",
   async (payload, { rejectWithValue }) => {
      try {
         const { data } = await axios.post("/api/notes/templates", payload);
         return data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const updateTemplate = createAsyncThunk(
   "notes/updateTemplate",
   async ({ id, ...payload }, { rejectWithValue }) => {
      try {
         const { data } = await axios.patch(`/api/notes/templates/${id}`, payload);
         return data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const deleteTemplate = createAsyncThunk(
   "notes/deleteTemplate",
   async (id, { rejectWithValue }) => {
      try {
         await axios.delete(`/api/notes/templates/${id}`);
         return id;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

// ============================================================
// SLICE
// ============================================================

const notesSlice = createSlice({
   name: "notes",
   initialState: {
      // personal notes
      notes: [],
      // notes for a specific target (topic/exercise etc)
      targetNotes: [],
      // global/public notes
      globalNotes: [],
      // currently open note in editor
      activeNote: null,
      // templates (global + user's own)
      templates: [],

      loading: false,
      templateLoading: false,
      error: null,
   },

   reducers: {
      // Set active note locally without an API call
      // useful when switching between notes in the sidebar
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