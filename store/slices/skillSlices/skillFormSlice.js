import {
  SKILL_FORM_DOMAINS,
  SKILLS_UI_KEYS,
} from "@/store/constants/skillsConstants";
import { SLICE_NAMES } from "@/store/constants/sliceConstants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  [SKILL_FORM_DOMAINS.SKILLS]: {
    [SKILLS_UI_KEYS.MANAGE_POPUP]: {
      [SKILLS_UI_KEYS.IS_OPEN]: false,
      [SKILLS_UI_KEYS.EDIT_ID]: null,
      [SKILLS_UI_KEYS.FORM_DATA]: {
        title: "",
        order: "",
      },
    },
    [SKILLS_UI_KEYS.DELETE_POPUP]: {
      [SKILLS_UI_KEYS.IS_OPEN]: false,
      item: null,
    },
  },
  [SKILL_FORM_DOMAINS.CATEGORIES]: {
    [SKILLS_UI_KEYS.MANAGE_POPUP]: {
      [SKILLS_UI_KEYS.IS_OPEN]: false,
      [SKILLS_UI_KEYS.EDIT_ID]: null,
      [SKILLS_UI_KEYS.FORM_DATA]: {},
    },
    [SKILLS_UI_KEYS.DELETE_POPUP]: {
      [SKILLS_UI_KEYS.IS_OPEN]: false,
      item: null,
    },
  },
  [SKILL_FORM_DOMAINS.TOPICS]: {
    [SKILLS_UI_KEYS.MANAGE_POPUP]: {
      [SKILLS_UI_KEYS.IS_OPEN]: false,
      [SKILLS_UI_KEYS.EDIT_ID]: null,
      [SKILLS_UI_KEYS.FORM_DATA]: {},
    },
    [SKILLS_UI_KEYS.DELETE_POPUP]: {
      [SKILLS_UI_KEYS.IS_OPEN]: false,
      item: null,
    },
  },
  [SKILL_FORM_DOMAINS.REVISIONS]: {
    [SKILLS_UI_KEYS.MANAGE_POPUP]: {
      [SKILLS_UI_KEYS.IS_OPEN]: false,
      [SKILLS_UI_KEYS.EDIT_ID]: null,
      [SKILLS_UI_KEYS.FORM_DATA]: {},
    },
    [SKILLS_UI_KEYS.DELETE_POPUP]: {
      [SKILLS_UI_KEYS.IS_OPEN]: false,
      item: null,
    },
  },
};

const skillFormSlice = createSlice({
  name: SLICE_NAMES.SKILL_FORM,
  initialState,
  reducers: {
    // -- Reset Form State ---
    resteSkillFormState: () => initialState,
    // -- Open Skill Manage Popup ---
    openSkillManagePopup: (state, action) => {
      const { domain, editData, defaults } = action.payload;
      if (!state[domain]) return;
      const target = state[domain][SKILLS_UI_KEYS.MANAGE_POPUP];
      target[SKILLS_UI_KEYS.IS_OPEN] = true;
      target[SKILLS_UI_KEYS.EDIT_ID] = editData?.id || null;

      if (editData) {
        target[SKILLS_UI_KEYS.FORM_DATA] = Object.keys(
          target[SKILLS_UI_KEYS.FORM_DATA],
        ).reduce((acc, key) => {
          acc[key] = editData[key] ?? "";
          return acc;
        }, {});
      } else {
        target[SKILLS_UI_KEYS.FORM_DATA] = {
          ...initialState[domain][SKILLS_UI_KEYS.FORM_DATA],
          ...defaults,
        };
      }
    },
    // -- Update Skill Form Fields ---
    updateSkillFormFields: (state, action) => {
      const { domain, name, value } = action.payload;
      if (!state[domain]) return;
      state[domain][SKILLS_UI_KEYS.MANAGE_POPUP][SKILLS_UI_KEYS.FORM_DATA][
        name
      ] = value;
    },
    // --- Close Manage Popup ---
    closeSkillManagePopup: (state, action) => {
      const { domain } = action.payload;
      if (!state[domain]) return;
      state[domain] = initialState[domain];
    },
    // --- Open Skill Delete Popup ---
    openSkillDeletePopup: (state, action) => {
      const { domain, item } = action.payload;
      if (!state[domain]) return;
      const target = state[domain][SKILLS_UI_KEYS.DELETE_POPUP];
      target[SKILLS_UI_KEYS.IS_OPEN] = true;
      target.item = item;
    },
    // --- close Skill Delete Popup ---
    closeSkillDeletePopup: (state, action) => {
      const { domain } = action.payload;
      if (!state[domain]) return;
      state[domain][SKILLS_UI_KEYS.DELETE_POPUP] =
        initialState[domain][SKILLS_UI_KEYS.DELETE_POPUP];
    },
  },
});

export const {
  openSkillManagePopup,
  updateSkillFormFields,
  closeSkillManagePopup,
  openSkillDeletePopup,
  closeSkillDeletePopup,
  resetSkillFormState,
} = skillFormSlice.actions;

export default skillFormSlice.reducer;
