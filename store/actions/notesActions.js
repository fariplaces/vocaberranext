// @/store/actions/notesActions.js
import { NOTES_KEYS } from "../constants/notesConstants";
import { createApiThunk } from "../utils/actionBuilder-smart";

const { PREFIX = "notes" } = NOTES_KEYS || {};

// ================== THUNKS — NOTES ==================

export const fetchNotes = createApiThunk(PREFIX, "fetchNotes", "get", "/notes");
export const fetchNoteById = createApiThunk(PREFIX, "fetchNoteById", "get", "/notes"); // Builder handles /${id}
export const fetchNotesByTarget = createApiThunk(PREFIX, "fetchNoteByTarget", "get", "/notes/target");
export const fetchGlobalNotes = createApiThunk(PREFIX, "fetchGlobalNotes", "get", "/notes/global");

export const createNote = createApiThunk(PREFIX, "createNote", "post", "/notes");
export const updateNote = createApiThunk(PREFIX, "updateNote", "patch", "/notes");
export const deleteNote = createApiThunk(PREFIX, "deleteNote", "delete", "/notes");

// --- Custom Note Actions ---
export const linkNote = createApiThunk(PREFIX, "linkNote", "patch", "/notes"); // see note below
export const unlinkNote = createApiThunk(PREFIX, "unlinkNote", "patch", "/notes");
export const publishNote = createApiThunk(PREFIX, "publishNote", "patch", "/notes");
export const unpublishNote = createApiThunk(PREFIX, "unpublishNote", "patch", "/notes");
export const importNote = createApiThunk(PREFIX, "importNote", "post", "/notes/import");

// ================== THUNKS — TEMPLATES ==================

export const fetchTemplates = createApiThunk(PREFIX, "fetchTemplates", "get", "/notes/templates");
export const createTemplate = createApiThunk(PREFIX, "createTemplate", "post", "/notes/templates");
export const updateTemplate = createApiThunk(PREFIX, "updateTemplate", "patch", "/notes/templates");
export const deleteTemplate = createApiThunk(PREFIX, "deleteTemplate", "delete", "/notes/templates");