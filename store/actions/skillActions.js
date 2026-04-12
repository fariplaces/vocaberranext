// @/store/actions/skillActions.js
import { SKILL_KEYS } from "../constants/skillsConstants";
import { createApiThunk } from "../utils/actionBuilder";

const { PREFIX = "skill" } = SKILL_KEYS || {};

// ================== SKILLS ==================
export const fetchSkills = createApiThunk(PREFIX, "fetchSkills", "get", "/skills/fetchSkills");
export const createSkill = createApiThunk(PREFIX, "createSkill", "post", "/skills/createSkill");
export const updateSkill = createApiThunk(PREFIX, "updateSkill", "patch", "/skills/updateSkill");
export const deleteSkill = createApiThunk(PREFIX, "deleteSkill", "delete", "/skills/deleteSkill");

// ================== CATEGORIES ==================
export const fetchCategories = createApiThunk(PREFIX, "fetchCategories", "get", "/skills/fetchCategories");
export const createCategory = createApiThunk(PREFIX, "createCategory", "post", "/skills/createCategory");
export const updateCategory = createApiThunk(PREFIX, "updateCategory", "patch", "/skills/updateCategory");
export const deleteCategory = createApiThunk(PREFIX, "deleteCategory", "delete", "/skills/deleteCategory");

// ================== TOPICS ==================
export const fetchTopics = createApiThunk(PREFIX, "fetchTopics", "get", "/skills/fetchTopics");
export const createTopic = createApiThunk(PREFIX, "createTopic", "post", "/skills/createTopic");
export const updateTopic = createApiThunk(PREFIX, "updateTopic", "patch", "/skills/updateTopic");
export const deleteTopic = createApiThunk(PREFIX, "deleteTopic", "delete", "/skills/deleteTopic");

// ================== REVISIONS ==================
export const fetchRevisions = createApiThunk(PREFIX, "fetchRevisions", "get", "/skills/fetchRevisions");
export const createRevision = createApiThunk(PREFIX, "createRevision", "post", "/skills/createRevision");
export const updateRevision = createApiThunk(PREFIX, "updateRevision", "patch", "/skills/updateRevision");
export const deleteRevision = createApiThunk(PREFIX, "deleteRevision", "delete", "/skills/deleteRevision");