import { SLICE_NAMES } from "@/store/constants/sliceConstants";
import { FORM_DOMAINS, UI_KEYS } from "@/store/constants/typingConstants"; // Ensure this path is correct
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  [FORM_DOMAINS.TYPINGS]: {
    [UI_KEYS.MANAGE_POPUP]: {
      [UI_KEYS.IS_OPEN]: false,
      [UI_KEYS.EDIT_ID]: null,
      [UI_KEYS.FORM_DATA]: {
        exerciseId: "",
        durationId: "",
        accuracy: "",
        gross: "",
        net: "",
      },
    },
    [UI_KEYS.DELETE_POPUP]: { [UI_KEYS.IS_OPEN]: false, item: null },
  },
  [FORM_DOMAINS.EXERCISES]: {
    [UI_KEYS.MANAGE_POPUP]: {
      [UI_KEYS.IS_OPEN]: false,
      [UI_KEYS.EDIT_ID]: null,
      [UI_KEYS.FORM_DATA]: {
        title: "",
        exerciseNo: "",
        typeId: "",
        lessonId: "",
      },
    },
    [UI_KEYS.DELETE_POPUP]: { [UI_KEYS.IS_OPEN]: false, item: null },
  },
};

const typingFormSlice = createSlice({
  name: SLICE_NAMES.TYPING_FORM,
  initialState,
  reducers: {
    openManagePopup: (state, action) => {
      const { domain, editData, defaults } = action.payload;
      const target = state[domain][UI_KEYS.MANAGE_POPUP];

      target[UI_KEYS.IS_OPEN] = true;
      target[UI_KEYS.EDIT_ID] = editData?.id || null;

      if (editData) {
        // ENTERPRISE PATTERN: Map incoming data to form structure
        // This handles cases where API object structure differs from Form structure
        target[UI_KEYS.FORM_DATA] = Object.keys(
          target[UI_KEYS.FORM_DATA],
        ).reduce((acc, key) => {
          acc[key] = editData[key] ?? editData.exercise?.[key] ?? "";
          return acc;
        }, {});
      } else {
        // RESET & APPLY DEFAULTS (e.g. your locked durationId)
        target[UI_KEYS.FORM_DATA] = {
          ...initialState[domain][UI_KEYS.MANAGE_POPUP][UI_KEYS.FORM_DATA],
          ...defaults,
        };
      }
    },

    updateFormField: (state, action) => {
      const { domain, name, value } = action.payload;
      state[domain][UI_KEYS.MANAGE_POPUP][UI_KEYS.FORM_DATA][name] = value;
    },

    closeManagePopup: (state, action) => {
      const { domain } = action.payload;
      state[domain] = initialState[domain];
    },
    // --- Delete Popup Actions ---
    /**
     * @param {Object} action.payload - { domain: 'exercises' | 'typings', item: {id, title...} }
     */
    openDeletePopup: (state, action) => {
      const { domain, item } = action.payload;

      // Safety check to prevent crashing if domain is wrong
      if (!state[domain]) return;

      const target = state[domain][UI_KEYS.DELETE_POPUP];
      target[UI_KEYS.IS_OPEN] = true;
      target.item = item; // Stores the whole object so the modal can show "Delete Lesson 1?"
    },

    closeDeletePopup: (state, action) => {
      const { domain } = action.payload;
      if (!state[domain]) return;

      // Reset only the delete popup part of that domain
      state[domain][UI_KEYS.DELETE_POPUP] =
        initialState[domain][UI_KEYS.DELETE_POPUP];
    },
  },
});

export const {
  openManagePopup,
  closeManagePopup,
  updateFormField,
  openDeletePopup,
  closeDeletePopup,
} = typingFormSlice.actions;

export default typingFormSlice.reducer;
