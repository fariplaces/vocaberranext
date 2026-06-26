// --- Base Selectors ---

import { SKILL_KEYS } from "@/store/constants/skillsConstants";
import {
  EMPTY_ARRAY,
  INITIAL_PAGINATION_STATE,
  PAGINATION_KEYS,
} from "@/store/constants/sliceConstants";
import { createSelector } from "@reduxjs/toolkit";
import { selectAllNotes } from "../notesSelectors";

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
          (a, b) => (a.order ?? 0) - (b.order ?? 0),
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
  },
);

// // Helper input selector to extract the skillId from the arguments
// const selectSkillIdArg = (_, skillId) => skillId;

// export const selectGraphicalSkillTreeMetaByFilter = createSelector(
//   [
//     selectAllSkills,
//     selectAllCategories,
//     selectAllTopics,
//     selectSkillLoading,
//     selectSkillIdArg, // 👈 Step 1: Add the dynamic argument selector
//   ],
//   (skills, categories, topics, isInitialLoading, targetSkillId) => {
//     // Step 2: If a targetSkillId is provided, filter the source skills array early
//     // This dramatically cuts down unnecessary iterations if you only care about one skill.
//     const filteredSkills = targetSkillId
//       ? skills.filter((skill) => skill.id === targetSkillId)
//       : skills;

//     // 1. Group topics by their target category ID
//     const topicsMap = topics.reduce((acc, topic) => {
//       if (!acc[topic.categoryId]) acc[topic.categoryId] = [];
//       acc[topic.categoryId].push(topic);
//       return acc;
//     }, {});

//     // 2. Initialize recursive category objects
//     const categoryMap = {};
//     categories.forEach((cat) => {
//       categoryMap[cat.id] = {
//         ...cat,
//         type: "category",
//         topics: (topicsMap[cat.id] || []).sort(
//           (a, b) => (a.order ?? 0) - (b.order ?? 0),
//         ),
//         subCategories: [],
//       };
//     });

//     // 3. Assemble the recursive category forest
//     const topLevelCategoriesBySkill = {};

//     Object.values(categoryMap).forEach((category) => {
//       if (category.parentId) {
//         const parentNode = categoryMap[category.parentId];
//         if (parentNode) {
//           parentNode.subCategories.push(category);
//         }
//       } else if (category.skillId) {
//         if (!topLevelCategoriesBySkill[category.skillId]) {
//           topLevelCategoriesBySkill[category.skillId] = [];
//         }
//         topLevelCategoriesBySkill[category.skillId].push(category);
//       }
//     });

//     // Recursive sorting algorithm for depth nested categories
//     const sortTreeRecursively = (cats) => {
//       cats.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
//       cats.forEach((cat) => {
//         if (cat.subCategories.length > 0) {
//           sortTreeRecursively(cat.subCategories);
//         }
//       });
//     };

//     // 4. Construct complete ordered matrix grouped under filtered Skills
//     const structuredTree = filteredSkills // 👈 Step 3: Map over the filtered subset
//       .map((skill) => {
//         const skillCats = topLevelCategoriesBySkill[skill.id] || [];
//         sortTreeRecursively(skillCats);
//         return {
//           ...skill,
//           type: "skill",
//           categories: skillCats,
//         };
//       })
//       .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

//     return {
//       sortedSkillsTree: structuredTree,
//       isInitialLoading,
//     };
//   },
// );

// by providing argument to filter
// const skillId = "some-uuid-1234";
// const { sortedSkillsTree, isInitialLoading } = useSelector(state =>
//   selectGraphicalSkillTreeMeta(state, skillId)
// );

// Select All
// const { sortedSkillsTree, isInitialLoading } = useSelector(state =>
//   selectGraphicalSkillTreeMeta(state)
// );

const selectSkillIdArg = (_, skillId) => skillId;

export const selectGraphicalSkillTreeMetaByFilter = createSelector(
  [
    selectAllSkills,
    selectAllCategories,
    selectAllTopics,
    selectAllNotes, // 👈 Step 1: Inject your real notes selector input
    selectSkillLoading,
    selectSkillIdArg,
  ],
  (skills, categories, topics, notes = [], isInitialLoading, targetSkillId) => {
    // Filter the source skills array early
    const filteredSkills = targetSkillId
      ? skills.filter((skill) => skill.id === targetSkillId)
      : skills;

    // Step 2: Build a high-performance hash map grouping all notes by their target ID
    const notesMap = notes.reduce((acc, note) => {
      if (!note.targetId) return acc;
      if (!acc[note.targetId]) acc[note.targetId] = [];
      acc[note.targetId].push(note);
      return acc;
    }, {});

    // 1. Group topics by their target category ID + Inject notes
    const topicsMap = topics.reduce((acc, topic) => {
      if (!acc[topic.categoryId]) acc[topic.categoryId] = [];
      acc[topic.categoryId].push({
        ...topic,
        type: "topic",
        notes: notesMap[topic.id] || [], // 👈 Attaching Topic specific notes
      });
      return acc;
    }, {});

    // 2. Initialize recursive category objects + Inject notes
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.id] = {
        ...cat,
        type: "category",
        topics: (topicsMap[cat.id] || []).sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0),
        ),
        subCategories: [],
        notes: notesMap[cat.id] || [], // 👈 Attaching Category specific notes
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

    // 4. Construct complete ordered matrix grouped under filtered Skills + Inject notes
    const structuredTree = filteredSkills
      .map((skill) => {
        const skillCats = topLevelCategoriesBySkill[skill.id] || [];
        sortTreeRecursively(skillCats);
        return {
          ...skill,
          type: "skill",
          notes: notesMap[skill.id] || [], // 👈 Attaching Skill specific root notes
          categories: skillCats,
        };
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return {
      sortedSkillsTree: structuredTree,
      isInitialLoading,
    };
  },
);
