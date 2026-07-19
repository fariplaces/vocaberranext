// @/store/constants/uilibConstants.js
export const UILIB_KEYS = {
  PREFIX: "uilib",

  COMPONENTS: "components",
  README: "readme",

  LOADING: "loading",
  ERROR: "error",
};

// UI-only state (popup open/edit/delete target) — kept separate from the
// data slice above, same split used by store/constants/skillsConstants.js.
export const UILIB_UI_KEYS = {
  MANAGE_POPUP: "managePopup",
  DELETE_POPUP: "deletePopup",
  IS_OPEN: "isOpen",
  EDIT_ID: "editId",
  FORM_DATA: "formData",
  ITEM: "item",
};

export const BLANK_SPECIMEN_FORM = {
  category: "Uncategorized",
  name: "",
  description: "",
  component: "",
  engine: "css",
  layout: "boxed",
  importStatement: "",
  props: {},
  label: "",
  children: [],
  implementation: "",
  detailDocs: "",
};
