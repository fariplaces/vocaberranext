// @/store/actions/taskActions.js
import { createApiThunk } from "../utils/actionBuilder";
import { TASKS_KEYS } from "../constants/tasksConstants";

const { PREFIX = "tasks" } = TASKS_KEYS || {};

// ================== STANDARD TASKS ==================
export const fetchTasks = createApiThunk(PREFIX, "fetchTasks", "get", "/tasks/fetchTasks");
export const createTask = createApiThunk(PREFIX, "createTask", "post", "/tasks/createTask");
export const bulkImportTask = createApiThunk(PREFIX, "bulkImportTask", "post", "/tasks/bulkImportTask");
export const updateTask = createApiThunk(PREFIX, "updateTask", "patch", "/tasks/updateTask");
export const deleteTask = createApiThunk(PREFIX, "deleteTask", "delete", "/tasks/deleteTask");

// ================== DEFAULT TASKS ==================
export const fetchDefaultTasks = createApiThunk(PREFIX, "fetchDefaultTasks", "get", "/tasks/fetchDefaultTasks");
export const createDefaultTask = createApiThunk(PREFIX, "createDefaultTask", "post", "/tasks/createDefaultTask");
export const updateDefaultTask = createApiThunk(PREFIX, "updateDefaultTask", "patch", "/tasks/updateDefaultTask");
export const deleteDefaultTask = createApiThunk(PREFIX, "deleteDefaultTask", "delete", "/tasks/deleteDefaultTask");