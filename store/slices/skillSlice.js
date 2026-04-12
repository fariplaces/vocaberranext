import { createSlice } from "@reduxjs/toolkit";
import { createCategory, createRevision, createSkill, createTopic, deleteCategory, deleteRevision, deleteSkill, deleteTopic, fetchCategories, fetchRevisions, fetchSkills, fetchTopics, updateCategory, updateRevision, updateSkill, updateTopic } from "../actions/skillActions";
import { SLICE_NAMES } from "../constants/sliceConstants";

const skillSlice = createSlice({
  name: SLICE_NAMES.SKILL,
  initialState: {
    sideMenu: [],
    skills: [],
    categories: [],
    topics: [],
    revisions: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetSkillsState: (state) => {
      state.sideMenu = [];
      skills = [];
      categories = [];
      topics = [];
      sidebarOpen = true;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Skills
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) // Create Skill
      .addCase(createSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = [action.payload, ...state.skills];
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Skills
      .addCase(updateSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.loading = false;
        // 1. Find the index of the record that was just updated
        const index = state.skills.findIndex(
          (item) => item.id === action.payload.id
        );
        // 2. If found, replace the old object with the new one from the API
        if (index !== -1) {
          state.skills[index] = action.payload;
        }
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Skill
      .addCase(deleteSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = state.skills.filter(
          (item) => item.id !== action.meta.arg
        );
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })  // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) // Create Category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = [action.payload, ...state.categories];
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        // 1. Find the index of the record that was just updated
        const index = state.categories.findIndex(
          (item) => item.id === action.payload.id
        );
        // 2. If found, replace the old object with the new one from the API
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (item) => item.id !== action.meta.arg
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })  // Fetch Topics
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) // Create Topic
      .addCase(createTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = [action.payload, ...state.topics];
      })
      .addCase(createTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Topic
      .addCase(updateTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        state.loading = false;
        // 1. Find the index of the record that was just updated
        const index = state.topics.findIndex(
          (item) => item.id === action.payload.id
        );
        // 2. If found, replace the old object with the new one from the API
        if (index !== -1) {
          state.topics[index] = action.payload;
        }
      })
      .addCase(updateTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Topic
      .addCase(deleteTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = state.topics.filter(
          (item) => item.id !== action.meta.arg
        );
      })
      .addCase(deleteTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })  // Fetch Revisions
      .addCase(fetchRevisions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRevisions.fulfilled, (state, action) => {
        state.loading = false;
        state.revisions = action.payload;
      })
      .addCase(fetchRevisions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) // Create Revision
      .addCase(createRevision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRevision.fulfilled, (state, action) => {
        state.loading = false;
        state.revisions = [action.payload, ...state.revisions];
      })
      .addCase(createRevision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Revision
      .addCase(updateRevision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRevision.fulfilled, (state, action) => {
        state.loading = false;
        // 1. Find the index of the record that was just updated
        const index = state.revisions.findIndex(
          (item) => item.id === action.payload.id
        );
        // 2. If found, replace the old object with the new one from the API
        if (index !== -1) {
          state.revisions[index] = action.payload;
        }
      })
      .addCase(updateRevision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Revision
      .addCase(deleteRevision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRevision.fulfilled, (state, action) => {
        state.loading = false;
        state.revisions = state.revisions.filter(
          (item) => item.id !== action.meta.arg
        );
      })
      .addCase(deleteRevision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSkillsState } = skillSlice.actions;
export default skillSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";
// import * as actions from "../actions/skillActions"; // Import all for easier case handling
// import { SLICE_NAMES } from "../constants/sliceConstants";
// import { SKILL_KEYS } from "../constants/skillConstants";

// const skillSlice = createSlice({
//   name: SLICE_NAMES.SKILL,
//   initialState: {
//     [SKILL_KEYS.SIDE_MENU]: [],
//     [SKILL_KEYS.SKILLS]: [],
//     [SKILL_KEYS.CATEGORIES]: [],
//     [SKILL_KEYS.TOPICS]: [],
//     [SKILL_KEYS.REVISIONS]: [],
//     [SKILL_KEYS.LOADING]: false,
//     [SKILL_KEYS.ERROR]: null,
//   },
//   reducers: {
//     resetSkillsState: (state) => {
//       state[SKILL_KEYS.SIDE_MENU] = [];
//       state[SKILL_KEYS.SKILLS] = [];
//       state[SKILL_KEYS.CATEGORIES] = [];
//       state[SKILL_KEYS.TOPICS] = [];
//       state[SKILL_KEYS.REVISIONS] = [];
//       state[SKILL_KEYS.LOADING] = false;
//       state[SKILL_KEYS.ERROR] = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // ================== FETCH FULFILLED ==================
//       .addCase(actions.fetchSkills.fulfilled, (state, action) => {
//         state[SKILL_KEYS.SKILLS] = action.payload;
//       })
//       .addCase(actions.fetchCategories.fulfilled, (state, action) => {
//         state[SKILL_KEYS.CATEGORIES] = action.payload;
//       })
//       .addCase(actions.fetchTopics.fulfilled, (state, action) => {
//         state[SKILL_KEYS.TOPICS] = action.payload;
//       })
//       .addCase(actions.fetchRevisions.fulfilled, (state, action) => {
//         state[SKILL_KEYS.REVISIONS] = action.payload;
//       })

//       // ================== CREATE FULFILLED ==================
//       .addCase(actions.createSkill.fulfilled, (state, action) => {
//         state[SKILL_KEYS.SKILLS].unshift(action.payload);
//       })
//       .addCase(actions.createCategory.fulfilled, (state, action) => {
//         state[SKILL_KEYS.CATEGORIES].unshift(action.payload);
//       })
//       .addCase(actions.createTopic.fulfilled, (state, action) => {
//         state[SKILL_KEYS.TOPICS].unshift(action.payload);
//       })
//       .addCase(actions.createRevision.fulfilled, (state, action) => {
//         state[SKILL_KEYS.REVISIONS].unshift(action.payload);
//       })

//       // ================== UPDATE FULFILLED ==================
//       // Logic: Generic update helper to keep code clean
//       .addMatcher(
//         (action) => action.type.startsWith(`${SKILL_KEYS.PREFIX}/update`) && action.type.endsWith("/fulfilled"),
//         (state, action) => {
//           const updated = action.payload;
//           const entityType = action.type.split('/')[1].replace('update', '').toLowerCase() + 's';
          
//           if (state[entityType]) {
//             state[entityType] = state[entityType].map(item => 
//               item.id === updated.id ? updated : item
//             );
//           }
//         }
//       )

//       // ================== DELETE FULFILLED ==================
//       .addMatcher(
//         (action) => action.type.startsWith(`${SKILL_KEYS.PREFIX}/delete`) && action.type.endsWith("/fulfilled"),
//         (state, action) => {
//           const id = action.meta.arg; // The ID passed to the delete call
//           const entityType = action.type.split('/')[1].replace('delete', '').toLowerCase() + 's';
          
//           if (state[entityType]) {
//             state[entityType] = state[entityType].filter(item => item.id !== id);
//           }
//         }
//       )

//       // ============================================================
//       // GLOBAL STATE MATCHERS (Handles Loading & Errors for ALL)
//       // ============================================================
//       .addMatcher(
//         (action) => action.type.startsWith(`${SKILL_KEYS.PREFIX}/`) && action.type.endsWith("/pending"),
//         (state) => {
//           state[SKILL_KEYS.LOADING] = true;
//           state[SKILL_KEYS.ERROR] = null;
//         }
//       )
//       .addMatcher(
//         (action) => action.type.startsWith(`${SKILL_KEYS.PREFIX}/`) && (action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")),
//         (state) => {
//           state[SKILL_KEYS.LOADING] = false;
//         }
//       )
//       .addMatcher(
//         (action) => action.type.startsWith(`${SKILL_KEYS.PREFIX}/`) && action.type.endsWith("/rejected"),
//         (state, action) => {
//           state[SKILL_KEYS.ERROR] = action.payload || "Skill module error";
//         }
//       );
//   },
// });

// export const { resetSkillsState } = skillSlice.actions;
// export default skillSlice.reducer;