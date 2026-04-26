import api from "@/config/apiConfig";

export const typingService = {
   // --- Fetches ---
   fetchExercises: (params) => api.get("/typing/fetchExercises", { params }),

   // Note: We receive the route here to support your multi-key bucket strategy
   fetchTypings: (params) => api.get("/typing/fetchTypings", { params }),

   fetchLessons: () => api.get("/typing/fetchLessons"),
   fetchDurations: () => api.get("/typing/fetchDurations"),

   // --- CRUD ---
   // The service handles ID extraction and URL construction
   createTyping: (payload) => api.post("/typing/createTyping", payload),

   updateTyping: (id, payload) => api.patch(`/typing/updateTyping/${id}`, payload),

   deleteTyping: (id) => api.delete(`/typing/deleteTyping/${id}`),
};