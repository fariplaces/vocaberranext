import { createApiThunk } from "../utils/actionBuilder";

// --- Paginated Fetches ---
export const fetchExercises = createApiThunk("fetchExercises", "get", "/api/typing/fetchExercises");
export const fetchTypings = createApiThunk("fetchTypings", "get", "/api/typing/fetchTypings");

// --- Metadata Fetches ---
export const fetchLessons = createApiThunk("fetchLessons", "get", "/api/typing/fetchLessons");
export const fetchDurations = createApiThunk("fetchDurations", "get", "/api/typing/fetchDurations");
export const fetchExerciseTypes = createApiThunk("fetchExerciseTypes", "get", "/api/typing/fetchExerciseTypes");

// --- CRUD Operations ---
export const createTyping = createApiThunk("createTyping", "post", "/api/typing/createTyping");
export const updateTyping = createApiThunk("updateTyping", "patch", "/api/typing/updateTyping");
export const deleteTyping = createApiThunk("deleteTyping", "delete", "/api/typing/deleteTyping");

export const createExercise = createApiThunk("createExercise", "post", "/api/typing/createExercise");
export const updateExercise = createApiThunk("updateExercise", "patch", "/api/typing/updateExercise");
export const deleteExercise = createApiThunk("deleteExercise", "delete", "/api/typing/deleteExercise");