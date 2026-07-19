// @/store/selectors/uilibFormSelectors.js
import { createSelector } from "@reduxjs/toolkit";
import { UILIB_UI_KEYS } from "../constants/uilibConstants";

export const selectUilibFormState = (state) => state.uilibForm;

export const selectUilibManagePopupMeta = createSelector(
  [selectUilibFormState],
  (formState) => {
    const manage = formState[UILIB_UI_KEYS.MANAGE_POPUP] || {};
    return {
      isOpen: manage[UILIB_UI_KEYS.IS_OPEN] || false,
      editId: manage[UILIB_UI_KEYS.EDIT_ID] || null,
      formData: manage[UILIB_UI_KEYS.FORM_DATA] || {},
    };
  }
);

export const selectUilibDeletePopupMeta = createSelector(
  [selectUilibFormState],
  (formState) => {
    const del = formState[UILIB_UI_KEYS.DELETE_POPUP] || {};
    return {
      isOpen: del[UILIB_UI_KEYS.IS_OPEN] || false,
      item: del[UILIB_UI_KEYS.ITEM] || null,
    };
  }
);
