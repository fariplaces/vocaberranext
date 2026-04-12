// @/store/actions/typingActions.js
import { TYPING_KEYS } from "../constants/typingConstants";
import { createApiThunk } from "../utils/actionBuilder";

const { PREFIX = "typing" } = TYPING_KEYS || {};
// const PREFIX = TYPING_KEYS?.PREFIX || "typing";

// --- Paginated Fetches ---
export const fetchExercises = createApiThunk(PREFIX, "fetchExercises", "get", "/typing/fetchExercises");
export const fetchTypings = createApiThunk(PREFIX, "fetchTypings", "get", "/typing/fetchTypings");

// --- Metadata Fetches ---
export const fetchLessons = createApiThunk(PREFIX, "fetchLessons", "get", "/typing/fetchLessons");
export const fetchDurations = createApiThunk(PREFIX, "fetchDurations", "get", "/typing/fetchDurations");
export const fetchExerciseTypes = createApiThunk(PREFIX, "fetchExerciseTypes", "get", "/typing/fetchExerciseTypes");

// --- CRUD Operations ---
export const createTyping = createApiThunk(PREFIX, "createTyping", "post", "/typing/createTyping");
export const updateTyping = createApiThunk(PREFIX, "updateTyping", "patch", "/typing/updateTyping");
export const deleteTyping = createApiThunk(PREFIX, "deleteTyping", "delete", "/typing/deleteTyping");

export const createExercise = createApiThunk(PREFIX, "createExercise", "post", "/typing/createExercise");
export const updateExercise = createApiThunk(PREFIX, "updateExercise", "patch", "/typing/updateExercise");
export const deleteExercise = createApiThunk(PREFIX, "deleteExercise", "delete", "/typing/deleteExercise");