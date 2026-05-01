// @/services/client/typingServices.js
import API from "@/config/apiConfig";

export const typingServices = {
    // --- Fetches ---
    fetchExercises: (params) => API.get("/typing/fetchExercises", { params }),
    fetchExerciseTypes: () => API.get("/typing/fetchExerciseTypes"),
    fetchTypings: (params) => API.get("/typing/fetchTypings", { params }),
    fetchLessons: () => API.get("/typing/fetchLessons"),
    fetchDurations: () => API.get("/typing/fetchDurations"),

    // --- Exercise CRUD ---
    createExercise: (payload) => API.post("/typing/createExercise", payload),
    updateExercise: (id, payload) => API.patch(`/typing/updateExercise/${id}`, payload),
    deleteExercise: (id) => API.delete(`/typing/deleteExercise/${id}`),

    // --- Typing Result CRUD ---
    createTyping: (payload) => API.post("/typing/createTyping", payload),
    updateTyping: (id, payload) => API.patch(`/typing/updateTyping/${id}`, payload),
    deleteTyping: (id) => API.delete(`/typing/deleteTyping/${id}`),
};