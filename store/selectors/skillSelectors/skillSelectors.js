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

// export const selectRenderFilteredCategories = (route) =>
//   createSelector(
//     [
//       selectAllCategories,
//       selectSkillLoading,
//       selectCategoriesPagination,
//       selectIsFetchingMoreCategories,
//       selectHasMoreCategories,
//     ],
//     (categories, isInitialLoading, pagination, isFetchingMore, hasMore) => {
//       const filterCategories = categories.filter((item) => {
//         if (route === "parent-categories") return item?.parentId === null;
//         if (route === "sub-categories")
//           return (
//             item?.parentId !== null && item.children && item.children.length > 0
//           );
//         if (route === "categories")
//           return (
//             item?.parentId !== null &&
//             item?.children &&
//             item?.children.length === 0
//           );
//       });

//       return {
//         categories: filterCategories,
//         isInitialLoading,
//         pagination,
//         isFetchingMore,
//         hasMore,
//       };
//     },
//   );

// export const selectSkillPagination = (state) => state.skill.pagination || {};

// --- Combined Filtering + Grouping Engine ---
export const selectRenderFilteredCategories = (route) =>
  createSelector(
    [selectAllCategories, selectSkillLoading],
    (categories, isInitialLoading) => {
      // 1. Execute Tab Filtering First
      const filteredList = categories.filter((item) => {
        if (route === "parent-categories") return item?.parentId === null;
        if (route === "sub-categories") {
          return (
            item?.parentId !== null &&
            item?.children &&
            item?.children.length > 0
          );
        }
        if (route === "categories") {
          return (
            item?.parentId !== null &&
            item?.children &&
            item?.children.length === 0
          );
        }
        return true;
      });

      // 2. Execute Hierarchical Grouping on the Filtered Subset Only
      const groupedData = filteredList.reduce((acc, item) => {
        const skillObj = item.parent ? item.parent.skill : item.skill;
        const skillName = skillObj?.title || "Unassigned Skill";
        const skillOrder = skillObj?.order ?? 999;

        const parentTitle = item.parent ? item.parent.title : "Root Categories";
        const parentOrder = item.parent ? (item.parent.order ?? 999) : -1;

        if (!acc[skillName]) {
          acc[skillName] = { order: skillOrder, parents: {} };
        }

        if (!acc[skillName].parents[parentTitle]) {
          acc[skillName].parents[parentTitle] = {
            order: parentOrder,
            items: [],
          };
        }

        acc[skillName].parents[parentTitle].items.push(item);
        return acc;
      }, {});

      // 3. Sort Root Level Skills Matrix Array
      const sortedSkills = Object.entries(groupedData).sort(
        (a, b) => a[1].order - b[1].order,
      );

      return {
        sortedSkills, // 🌟 Pre-filtered, grouped, and sorted layout
        isInitialLoading,
      };
    },
  );

// export const selectGraphicalSkillTree = createSelector(
//   [selectAllCategories, selectAllTopics],
//   (categories, topics) => {
//     // 1. Map topics to their respective category targets for instant 0ms access
//     const topicsMap = topics.reduce((acc, topic) => {
//       if (!acc[topic.categoryId]) acc[topic.categoryId] = [];
//       acc[topic.categoryId].push(topic);
//       return acc;
//     }, {});

//     // 2. Build a comprehensive dictionary map of categories with embedded items
//     const categoryMap = {};
//     categories.forEach((cat) => {
//       categoryMap[cat.id] = {
//         ...cat,
//         topics: (topicsMap[cat.id] || []).sort(
//           (a, b) => (a.order ?? 0) - (b.order ?? 0),
//         ),
//         subCategories: [],
//       };
//     });

//     const tier1Parents = [];

//     // 3. Thread the parent-child relationships together instantly
//     Object.values(categoryMap).forEach((category) => {
//       if (category.parentId) {
//         const parentNode = categoryMap[category.parentId];
//         if (parentNode) {
//           parentNode.subCategories.push(category);
//         }
//       } else {
//         // No parentId means it's an absolute Tier 1 Parent Category
//         tier1Parents.push(category);
//       }
//     });

//     // 4. Sort everything globally by order rank
//     const sortArr = (arr) =>
//       arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

//     // Recursively sort deeper sub-tiers
//     tier1Parents.forEach((parent) => {
//       sortArr(parent.subCategories);
//       parent.subCategories.forEach((sub) => sortArr(sub.subCategories));
//     });

//     return sortArr(tier1Parents);
//   },
// );

export const selectGraphicalSkillTreeMeta = createSelector(
  [selectAllCategories, selectAllTopics, selectSkillLoading],
  (categories, topics, isInitialLoading) => {
    // 1. Map topics to categories
    const topicsMap = topics.reduce((acc, topic) => {
      if (!acc[topic.categoryId]) acc[topic.categoryId] = [];
      acc[topic.categoryId].push(topic);
      return acc;
    }, {});

    // 2. Build our category map configuration
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.id] = {
        ...cat,
        topics: (topicsMap[cat.id] || []).sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0),
        ),
        subCategories: [],
      };
    });

    const tier1Parents = [];

    // 3. Thread parent-child category relations
    Object.values(categoryMap).forEach((category) => {
      if (category.parentId) {
        const parentNode = categoryMap[category.parentId];
        if (parentNode) parentNode.subCategories.push(category);
      } else {
        tier1Parents.push(category);
      }
    });

    // 4. Sort everything cleanly by order parameters
    const sortArr = (arr) =>
      arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    tier1Parents.forEach((parent) => {
      sortArr(parent.subCategories);
      parent.subCategories.forEach((sub) => sortArr(sub.subCategories));
    });

    return {
      sortedSkillsTree: sortArr(tier1Parents),
      isInitialLoading,
    };
  },
);
