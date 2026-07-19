export const EMPTY_ARRAY = Object.freeze([]);

export const SLICE_NAMES = {
  AUTH: "auth",
  GLOBAL: "global",
  UI: "ui",
  WORDS: "words",
  WORD_MEANINGS: "wordMeanings",

  // Typing Slices
  TYPING: "typing",
  TYPING_FORM: "typingForm",

  // Skill Slices
  SKILL: "skill",
  SKILL_FORM: "skillForm",

  TASKS: "tasks",
  NOTES: "notes",
  UILIB: "uilib",
  UILIB_FORM: "uilibForm",
};

export const PAGINATION_KEYS = {
  CURRENT_PAGE: "currentPage",
  LAST_PAGE: "lastPage",
  PER_PAGE: "perPage",
  HAS_NEXT_PAGE: "hasNextPage",
  IS_FETCHING: "isFetching",
  TOTAL_COUNT: "totalCount",
};

export const INITIAL_PAGINATION_STATE = Object.freeze({
  [PAGINATION_KEYS.CURRENT_PAGE]: 1,
  [PAGINATION_KEYS.LAST_PAGE]: 1,
  [PAGINATION_KEYS.PER_PAGE]: 10,
  [PAGINATION_KEYS.HAS_NEXT_PAGE]: false,
  [PAGINATION_KEYS.IS_FETCHING]: false,
  [PAGINATION_KEYS.TOTAL_COUNT]: "",
});

export const INITIAL_FETCH_PARAMS = Object.freeze({
  page: 1,
  limit: 10,
});

// c: current page, l: limit
export const FETCH_MORE_PARAMS = (c, l) => ({
  page: (c || 1) + 1,
  limit: l,
});
