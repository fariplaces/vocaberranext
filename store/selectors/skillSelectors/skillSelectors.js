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
  (skill) => skill[SKILL_KEYS.SKILLS] || EMPTY_ARRAY
);

export const selectAllCategories = createSelector(
  [selectSkillState],
  (skill) => skill[SKILL_KEYS.CATEGORIES] || EMPTY_ARRAY
);

export const selectAllTopics = createSelector(
  [selectSkillState],
  (skill) => skill[SKILL_KEYS.TOPICS] || EMPTY_ARRAY
);

export const selectAllRevisions = createSelector(
  [selectSkillState],
  (skill) => skill[SKILL_KEYS.REVISIONS] || EMPTY_ARRAY
);

// 3. Static Value Selectors

export const selectSkillLoading = (state) =>
  selectSkillState(state)[SKILL_KEYS.LOADING] || false;

export const selectSkillErrors = (state) =>
  selectSkillState(state)[SKILL_KEYS.ERROR] || EMPTY_ARRAY;

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
        const parentOrder = item.parent ? item.parent.order ?? 999 : -1;

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
        (a, b) => a[1].order - b[1].order
      );

      return {
        sortedSkills, // 🌟 Pre-filtered, grouped, and sorted layout
        isInitialLoading,
      };
    }
  );
export const selectGraphicalSkillTreeMeta = createSelector(
  [selectAllSkills, selectAllCategories, selectAllTopics, selectSkillLoading],
  (skills, categories, topics, isInitialLoading) => {
    // 1. Group topics by their target category ID
    const topicsMap = topics.reduce((acc, topic) => {
      if (!acc[topic.categoryId]) acc[topic.categoryId] = [];
      acc[topic.categoryId].push(topic);
      return acc;
    }, {});

    // 2. Initialize recursive category objects
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.id] = {
        ...cat,
        type: "category",
        topics: (topicsMap[cat.id] || []).sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        ),
        subCategories: [],
      };
    });

    // 3. Assemble the recursive category forest
    const topLevelCategoriesBySkill = {};

    Object.values(categoryMap).forEach((category) => {
      if (category.parentId) {
        const parentNode = categoryMap[category.parentId];
        if (parentNode) {
          parentNode.subCategories.push(category);
        }
      } else if (category.skillId) {
        if (!topLevelCategoriesBySkill[category.skillId]) {
          topLevelCategoriesBySkill[category.skillId] = [];
        }
        topLevelCategoriesBySkill[category.skillId].push(category);
      }
    });

    // Recursive sorting algorithm for depth nested categories
    const sortTreeRecursively = (cats) => {
      cats.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      cats.forEach((cat) => {
        if (cat.subCategories.length > 0) {
          sortTreeRecursively(cat.subCategories);
        }
      });
    };

    // 4. Construct complete ordered matrix grouped under Skills
    const structuredTree = skills
      .map((skill) => {
        const skillCats = topLevelCategoriesBySkill[skill.id] || [];
        sortTreeRecursively(skillCats);
        return {
          ...skill,
          type: "skill",
          categories: skillCats,
        };
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return {
      sortedSkillsTree: structuredTree,
      isInitialLoading,
    };
  }
);

// export const selectGraphicalSkillTreeMeta = createSelector(
//   [selectAllCategories, selectAllTopics, selectSkillLoading],
//   (categories, topics, isInitialLoading) => {
//     // 1. Map topics to categories
//     const topicsMap = topics.reduce((acc, topic) => {
//       if (!acc[topic.categoryId]) acc[topic.categoryId] = [];
//       acc[topic.categoryId].push(topic);
//       return acc;
//     }, {});

//     // 2. Build our category map configuration
//     const categoryMap = {};
//     categories.forEach((cat) => {
//       categoryMap[cat.id] = {
//         ...cat,
//         topics: (topicsMap[cat.id] || []).sort(
//           (a, b) => (a.order ?? 0) - (b.order ?? 0)
//         ),
//         subCategories: [],
//       };
//     });

//     const tier1Parents = [];

//     // 3. Thread parent-child category relations
//     Object.values(categoryMap).forEach((category) => {
//       if (category.parentId) {
//         const parentNode = categoryMap[category.parentId];
//         if (parentNode) parentNode.subCategories.push(category);
//       } else {
//         tier1Parents.push(category);
//       }
//     });

//     // 4. Sort everything cleanly by order parameters
//     const sortArr = (arr) =>
//       arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
//     tier1Parents.forEach((parent) => {
//       sortArr(parent.subCategories);
//       parent.subCategories.forEach((sub) => sortArr(sub.subCategories));
//     });

//     return {
//       sortedSkillsTree: sortArr(tier1Parents),
//       isInitialLoading,
//     };
//   }
// );
