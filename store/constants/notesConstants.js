// @/store/constants/notesConstants.js

export const NOTES_KEYS = {
   PREFIX: "notes",

   // Entity Keys (for State)
   NOTES: "notes",
   TARGET_NOTES: "targetNotes",
   GLOBAL_NOTES: "globalNotes",
   TEMPLATES: "templates",
   ACTIVE_NOTE: "activeNote",

   // UI States
   LOADING: "loading",
   TEMPLATE_LOADING: "templateLoading",
   ERROR: "error",

   // Target Types (for linking/unlinking)
   TARGET_TYPE: {
      TOPIC: "TOPIC",
      SKILL: "SKILL",
      GENERAL: "GENERAL"
   }
};