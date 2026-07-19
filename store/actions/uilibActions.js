// @/store/actions/uilibActions.js
import { UILIB_KEYS } from "../constants/uilibConstants";
import { createApiThunk } from "../utils/actionBuilder-smart";

const { PREFIX = "uilib" } = UILIB_KEYS || {};

// ================== THUNKS — COMPONENTS ==================

export const fetchUilibComponents = createApiThunk(PREFIX, "fetchComponents", "get", "/uilib/components");
export const createUilibComponent = createApiThunk(PREFIX, "createComponent", "post", "/uilib/components");
export const updateUilibComponent = createApiThunk(PREFIX, "updateComponent", "patch", "/uilib/components");
export const deleteUilibComponent = createApiThunk(PREFIX, "deleteComponent", "delete", "/uilib/components");

// ================== THUNKS — README ==================

export const fetchUilibReadme = createApiThunk(PREFIX, "fetchReadme", "get", "/uilib/readme");
export const updateUilibReadme = createApiThunk(PREFIX, "updateReadme", "patch", "/uilib/readme");
