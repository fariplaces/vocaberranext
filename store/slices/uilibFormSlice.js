// @/store/slices/uilibFormSlice.js
// UI-only state for the uilib catalog's manage/delete popups — separate from
// the data slice (uilibSlice.js), same split used by skillFormSlice.js. Only
// one entity type exists here (specimens), so unlike skillFormSlice this
// isn't keyed by a "domain" dictionary.
import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../constants/sliceConstants";
import { BLANK_SPECIMEN_FORM, UILIB_UI_KEYS } from "../constants/uilibConstants";

export const initialState = {
  [UILIB_UI_KEYS.MANAGE_POPUP]: {
    [UILIB_UI_KEYS.IS_OPEN]: false,
    [UILIB_UI_KEYS.EDIT_ID]: null,
    [UILIB_UI_KEYS.FORM_DATA]: { ...BLANK_SPECIMEN_FORM },
  },
  [UILIB_UI_KEYS.DELETE_POPUP]: {
    [UILIB_UI_KEYS.IS_OPEN]: false,
    [UILIB_UI_KEYS.ITEM]: null,
  },
};

const uilibFormSlice = createSlice({
  name: SLICE_NAMES.UILIB_FORM,
  initialState,
  reducers: {
    // --- Open Manage Popup (editData null => blank/create form) ---
    openManagePopup: (state, action) => {
      const editData = action.payload?.editData ?? null;
      const target = state[UILIB_UI_KEYS.MANAGE_POPUP];
      target[UILIB_UI_KEYS.IS_OPEN] = true;
      target[UILIB_UI_KEYS.EDIT_ID] = editData?.id || null;
      target[UILIB_UI_KEYS.FORM_DATA] = editData
        ? { ...BLANK_SPECIMEN_FORM, ...editData }
        : { ...BLANK_SPECIMEN_FORM };
    },
    // --- Replace the whole draft form object (specimen forms are nested
    //     objects/arrays, so this replaces wholesale rather than per-field) ---
    setManageFormData: (state, action) => {
      state[UILIB_UI_KEYS.MANAGE_POPUP][UILIB_UI_KEYS.FORM_DATA] = action.payload;
    },
    closeManagePopup: (state) => {
      state[UILIB_UI_KEYS.MANAGE_POPUP] = initialState[UILIB_UI_KEYS.MANAGE_POPUP];
    },
    // --- Open Delete Popup ---
    openDeletePopup: (state, action) => {
      const target = state[UILIB_UI_KEYS.DELETE_POPUP];
      target[UILIB_UI_KEYS.IS_OPEN] = true;
      target[UILIB_UI_KEYS.ITEM] = action.payload;
    },
    closeDeletePopup: (state) => {
      state[UILIB_UI_KEYS.DELETE_POPUP] = initialState[UILIB_UI_KEYS.DELETE_POPUP];
    },
  },
});

export const {
  openManagePopup,
  setManageFormData,
  closeManagePopup,
  openDeletePopup,
  closeDeletePopup,
} = uilibFormSlice.actions;

export default uilibFormSlice.reducer;
