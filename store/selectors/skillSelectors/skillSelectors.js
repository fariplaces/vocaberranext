// --- Base Selectors ---

import { SKILL_KEYS } from "@/store/constants/skillsConstants";
import {
  EMPTY_ARRAY,
  INITIAL_PAGINATION_STATE,
  PAGINATION_KEYS,
} from "@/store/constants/sliceConstants";
import { createSelector } from "@reduxjs/toolkit";

// 1. Root Slice Selector
export const selectSkillState = (state) => state.skill;

// 2. Memorized Collection Selectors

export const selectAllSkills = createSelector(
  [selectSkillState],
  (skill) => skill[SKILL_KEYS.SKILLS] || EMPTY_ARRAY,
);

export const selectAllCategories = createSelector(
  [selectSkillState],
  (skill) => skill[SKILL_KEYS.CATEGORIES] || EMPTY_ARRAY,
);

export const selectAllTopics = createSelector(
  [selectSkillState],
  (skill) => skill[SKILL_KEYS.TOPICS] || EMPTY_ARRAY,
);

export const selectAllRevisions = createSelector(
  [selectSkillState],
  (skill) => skill[SKILL_KEYS.REVISIONS] || EMPTY_ARRAY,
);

// 3. Static Value Selectors

export const selectSkillLoading = (state) =>
  selectSkillState(state)[SKILL_KEYS.LOADING] || false;

export const selectSkillErrors = (state) =>
  selectSkillState(state)[SKILL_KEYS.ERROR] || EMPTY_ARRAY;

// 4. Pagination Selectors

export const selectSkillsPagination = createSelector(
  [selectSkillState],
  (skill) => skill[SKILL_KEYS.SKILLS_PAGINATION] || INITIAL_PAGINATION_STATE,
);

export const selectCategoriesPagination = createSelector(
  [selectSkillState],
  (skill) =>
    skill[SKILL_KEYS.CATEGORIES_PAGINATION] || INITIAL_PAGINATION_STATE,
);

export const selectTopicsPagination = createSelector(
  [selectSkillState],
  (skill) => skill[SKILL_KEYS.TOPICS_PAGINATION] || INITIAL_PAGINATION_STATE,
);

export const selectRevisionsPagination = createSelector(
  [selectSkillState],
  (skill) => skill[SKILL_KEYS.REVISIONS_PAGINATION] || INITIAL_PAGINATION_STATE,
);

// 5. select is Fetching

export const selectIsFetchingMoreSkills = createSelector(
  [selectSkillsPagination],
  (pagination) => pagination[PAGINATION_KEYS.IS_FETCHING] || false,
);

export const selectIsFetchingMoreCategories = createSelector(
  [selectCategoriesPagination],
  (pagination) => pagination[PAGINATION_KEYS.IS_FETCHING] || false,
);

export const selectIsFetchingMoreTopics = createSelector(
  [selectTopicsPagination],
  (pagination) => pagination[PAGINATION_KEYS.IS_FETCHING] || false,
);

export const selectIsFetchingMoreRevisions = createSelector(
  [selectRevisionsPagination],
  (pagination) => pagination[PAGINATION_KEYS.IS_FETCHING] || false,
);

// 6. select has More

export const selectHasMoreSkills = createSelector(
  [selectSkillsPagination],
  (pagination) => pagination[PAGINATION_KEYS.HAS_NEXT_PAGE] || false,
);

export const selectHasMoreCategories = createSelector(
  [selectCategoriesPagination],
  (pagination) => pagination[PAGINATION_KEYS.HAS_NEXT_PAGE] || false,
);

export const selectHasMoreTopics = createSelector(
  [selectTopicsPagination],
  (pagination) => pagination[PAGINATION_KEYS.HAS_NEXT_PAGE] || false,
);

export const selectHasMoreRevisions = createSelector(
  [selectRevisionsPagination],
  (pagination) => pagination[PAGINATION_KEYS.HAS_NEXT_PAGE] || false,
);

export const selectRenderSkills = createSelector(
  [
    selectAllSkills,
    selectSkillLoading,
    selectSkillsPagination,
    selectIsFetchingMoreSkills,
    selectHasMoreSkills,
  ],
  (skills, isInitialLoading, pagination, isFetchingMore, hasMore) => ({
    skills,
    isInitialLoading,
    isFetchingMore,
    hasMore,
    pagination,
  }),
);
