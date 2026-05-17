// @/store/constants/sliceConstants.js

export const SLICE_NAMES = {
  AUTH: "auth",
  GLOBAL: "global",
  UI: "ui",
  WORDS: "words",
  WORD_MEANINGS: "wordMeanings",

  // Typing Slices
  TYPING: "typing",
  TYPING_FORM: "typingForm",

  SKILL: "skill",
  TASKS: "tasks",
  NOTES: "notes",
};

const PAGINATION_KEYS = {
  CURRENT_PAGE: "currentPage",
  LAST_PAGE: "lastPage",
  PER_PAGE: "perPage",
  HAS_NEXT_PAGE: "hasNextPage",
  IS_FETCHING: "isFetching",
};

export const INITIAL_PAGINATION_STATE = {
  [PAGINATION_KEYS.CURRENT_PAGE]: 1,
  [PAGINATION_KEYS.LAST_PAGE]: 1,
  [PAGINATION_KEYS.PER_PAGE]: 10,
  [PAGINATION_KEYS.HAS_NEXT_PAGE]: false,
  [PAGINATION_KEYS.IS_FETCHING]: false,
};
