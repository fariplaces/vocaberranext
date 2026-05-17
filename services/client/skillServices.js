import API from "@/config/apiConfig";

export const skillServices = {
  // --- Skills ---
  fetchSkills: (params) => API.get("/skills/fetchSkills", { params }),
  createSkill: (payload) => API.post("/skills/createSkill", payload),
  updateSkill: (id, payload) => API.patch(`/skills/updateSkill/${id}`, payload),
  deleteSkill: (id) => API.delete(`/skills/deleteSkill/${id}`),

  // --- Categories ---
  fetchCategories: (params) => API.get("/skills/fetchCategories", { params }),
  createCategory: (payload) => API.post("/skills/createCategory", payload),
  updateCategory: (id, payload) =>
    API.patch(`/skills/updateCategory/${id}`, payload),
  deleteCategory: (id) => API.delete(`/skills/deleteCategory/${is}`),

  // --- Topics ---
  fetchTopics: (params) => API.get("/skills/fetchTopics", { params }),
  createTopic: (payload) => API.post("/skills/createTopic", payload),
  updateTopic: (id, payload) => API.patch(`/skills/updateTopic/${id}`, payload),
  deleteTopic: (id) => API.delete(`/skills/deleteTopic/${id}`),

  // --- Revisions ---
  fetchRevisions: (params) => API.get("/skills/fetchRevisions", { params }),
  createRevision: (payload) => API.post("/skills/createRevision", payload),
  updateRevision: (id, payload) =>
    API.patch(`/skills/updateRevision/${id}`, payload),
  deleteRevision: (id) => API.delete(`/skills/deleteRevision/${id}`),
};
