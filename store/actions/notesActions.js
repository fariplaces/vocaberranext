import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ============================================================
// THUNKS — NOTES
// ============================================================

export const fetchNotes = createAsyncThunk(
   "notes/fetchNotes",
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
   "notes/fetchNoteByTarget",
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
   "notes/fetchNoteById",
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
   "notes/createNote",
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
   "notes/updateNote",
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
   "notes/deleteNote",
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
   "notes/linkNote",
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
   "notes/unlinkNote",
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
   "notes/publishNote",
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
   "notes/unpublishNote",
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
   "notes/importNote",
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
   "notes/fetchGlobalNotes",
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
