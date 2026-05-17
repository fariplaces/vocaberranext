// @/store/actions/skillActions.js
import { skillServices } from "@/services/client/skillServices";
import { SKILL_KEYS } from "../constants/skillsConstants";
import { createApiThunk } from "../utils/actionBuilder-smart";
import { createServiceThunk } from "../utils/thunkFactory";

const { PREFIX = "skill" } = SKILL_KEYS || {};

// ================== SKILLS ==================
export const fetchSkills = createServiceThunk(
  `${PREFIX}/fetchSkills`,
  (params) => skillServices.fetchSkills(params),
  {
    dataKey: SKILL_KEYS.SKILLS,
    paginationKey: SKILL_KEYS.SKILLS_PAGINATION,
    operation: "FETCH",
  },
);
export const createSkill = createServiceThunk(
  `${PREFIX}/createSkill`,
  (payload) => skillServices.createSkill(payload),
  { dataKey: SKILL_KEYS.SKILLS, operation: "CREATE" },
);
export const updateSkill = createServiceThunk(
  `${PREFIX}/updateSkill`,
  ({ id, ...payload }) => skillServices.updateSkill(id, payload),
  { dataKey: SKILL_KEYS.SKILLS, operation: "UPDATE" },
);
export const deleteSkill = createServiceThunk(
  `${PREFIX}/deleteSkill`,
  (id) => skillServices.deleteSkill(id),
  { dataKey: SKILL_KEYS.SKILLS, operation: "DELETE" },
);

// ================== CATEGORIES ==================
export const fetchCategories = createServiceThunk(
  `${PREFIX}/fetchCategories`,
  (params) => skillServices.fetchCategories(params),
  {
    dataKey: SKILL_KEYS.CATEGORIES,
    paginationKey: SKILL_KEYS.CATEGORIES_PAGINATION,
    operation: "FETCH",
  },
);
export const createCategory = createServiceThunk(
  `${PREFIX}/createCategory`,
  (payload) => skillServices.createCategory(payload),
  { dataKey: SKILL_KEYS.CATEGORIES, operation: "CREATE" },
);
export const updateCategory = createServiceThunk(
  `${PREFIX}/updateCategory`,
  ({ id, ...payload }) => skillServices.updateCategory(id, payload),
  { dataKey: SKILL_KEYS.CATEGORIES, operation: "UPDATE" },
);
export const deleteCategory = createServiceThunk(
  `${PREFIX}/deleteCategory`,
  (id) => skillServices.deleteCategory(id),
  { dataKey: SKILL_KEYS.CATEGORIES, operation: "DELETE" },
);

// ================== TOPICS ==================

export const fetchTopics = createServiceThunk(
  `${PREFIX}/fetchTopics`,
  (params) => skillServices.fetchTopics(params),
  {
    dataKey: SKILL_KEYS.TOPICS,
    paginationKey: SKILL_KEYS.TOPICS_PAGINATION,
    operation: "FETCH",
  },
);
export const createTopic = createServiceThunk(
  `${PREFIX}/createTopic`,
  (payload) => skillServices.createTopic(payload),
  { dataKey: SKILL_KEYS.TOPICS, operation: "CREATE" },
);
export const updateTopic = createServiceThunk(
  `${PREFIX}/updateTopic`,
  ({ id, ...payload }) => skillServices.updateTopic(id, payload),
  { dataKey: SKILL_KEYS.TOPICS, operation: "UPDATE" },
);
export const deleteTopic = createServiceThunk(
  `${PREFIX}/deleteTopic`,
  (id) => skillServices.deleteTopic(id),
  { dataKey: SKILL_KEYS.TOPICS, operation: "DELETE" },
);
// ================== REVISIONS ==================
export const fetchRevisions = createServiceThunk(
  `${PREFIX}/fetchRevisions`,
  (params) => skillServices.fetchRevisions(params),
  {
    dataKey: SKILL_KEYS.REVISIONS,
    paginationKey: SKILL_KEYS.REVISIONS_PAGINATION,
    operation: "FETCH",
  },
);
export const createRevision = createServiceThunk(
  `${PREFIX}/createRevision`,
  (payload) => skillServices.createRevision(payload),
  { dataKey: SKILL_KEYS.REVISIONS, operation: "CREATE" },
);
export const updateRevision = createServiceThunk(
  `${PREFIX}/updateRevision`,
  ({ id, ...payload }) => skillServices.updateRevision(id, payload),
  { dataKey: SKILL_KEYS.REVISIONS, operation: "UPDATE" },
);
export const deleteRevision = createServiceThunk(
  `${PREFIX}/deleteRevision`,
  (id) => skillServices.deleteRevision(id),
  { dataKey: SKILL_KEYS.REVISIONS, operation: "DELETE" },
);
