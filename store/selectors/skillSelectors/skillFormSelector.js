import {
  SKILL_FORM_DOMAINS,
  SKILLS_UI_KEYS,
} from "@/store/constants/skillsConstants";
import { SLICE_NAMES } from "@/store/constants/sliceConstants";
import { createSelector } from "@reduxjs/toolkit";

//* ****************************************************
// * Static Selectors
//* ****************************************************

// --- Skill Form Selector ---
export const selectSkillFormState = (state) => state[SLICE_NAMES.SKILL_FORM];

// --- Domain Selector ---
export const selectSkillFormDomainState = (domain) => (state) => {
  return selectSkillFormState(state)[domain] || {};
};

//TOPIC: Manage Popup Selectors --

// --- Manage Popup Selector Depending on Domain ---
export const selectSkillFormManagePopupState = (domain) => (state) => {
  return (
    selectSkillFormDomainState(domain)(state)[SKILLS_UI_KEYS.MANAGE_POPUP] || {}
  );
};

// --- Manage Popup (isOpen) Selector Depending on Domain ---
export const selectSkillFormManagePopupIsOpen = (domain) => (state) => {
  return (
    selectSkillFormManagePopupState(domain)(state)[SKILLS_UI_KEYS.IS_OPEN] ||
    false
  );
};

// --- Edit Id Selector Manage Popup ---
export const selectSkillFormManagePopupEditId = (domain) => (state) => {
  return (
    selectSkillFormManagePopupState(domain)(state)[SKILLS_UI_KEYS.EDIT_ID] ||
    null
  );
};

// --- Form Data Selector Manage Popup ---
export const selectSkillFormManagePopupFormData = (domain) => (state) => {
  return (
    selectSkillFormManagePopupState(domain)(state)[SKILLS_UI_KEYS.FORM_DATA] ||
    {}
  );
};

//TOPIC: Manage Popup Selectors --

// --- Delete Popup Selector Depending on Domain ---
export const selectSkillFormDeletePopupState = (domain) => (state) => {
  return (
    selectSkillFormDomainState(domain)(state)[SKILLS_UI_KEYS.DELETE_POPUP] || {}
  );
};

// --- Delete Popup (isOpen) Selector ---
export const selectSkillFormDeletePopupIsOpen = (domain) => (state) => {
  return (
    selectSkillFormDeletePopupState(domain)(state)[SKILLS_UI_KEYS.IS_OPEN] ||
    false
  );
};

// --- Delete Popup Item Selector ---
export const selectSkillFormDeletePopupItem = (domain) => (state) => {
  return selectSkillFormDeletePopupState(domain)(state).item || null;
};

//* ****************************************************
//- Memorized Selectors
//* ****************************************************

// --- Helper Meta Selector function ---

const createFormMetaEngine = (domain) =>
  createSelector([selectSkillFormState], (skillFormState) => {
    const domainState = skillFormState[domain] || {};
    const manage = domainState[SKILLS_UI_KEYS.MANAGE_POPUP] || {};
    const remove = domainState[SKILLS_UI_KEYS.DELETE_POPUP] || {};

    return {
      isOpen: manage[SKILLS_UI_KEYS.IS_OPEN] || false,
      editId: manage[SKILLS_UI_KEYS.EDIT_ID] || null,
      formData: manage[SKILLS_UI_KEYS.FORM_DATA] || {},
      isDeleteOpen: remove[SKILLS_UI_KEYS.IS_OPEN] || false,
      deleteItem: remove.item || null,
    };
  });

// --- Skill Form Meta Selector (Memorized) ---

export const selectSkillFormMeta = createFormMetaEngine(
  SKILL_FORM_DOMAINS.SKILLS,
);
export const selectCategorySkillFormMeta = createFormMetaEngine(
  SKILL_FORM_DOMAINS.CATEGORY,
);
export const selectTopicSkillFormMeta = createFormMetaEngine(
  SKILL_FORM_DOMAINS.TOPICS,
);
export const selectRevisionSkillFormMeta = createFormMetaEngine(
  SKILL_FORM_DOMAINS.REVISIONS,
);
