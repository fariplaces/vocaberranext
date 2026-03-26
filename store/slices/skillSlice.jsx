import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================== ASYNC THUNKS ==================

//## Side Menu Action

// Fetch all Side Menu
export const fetchSideMenu = createAsyncThunk(
  "skill/fetchSideMenu",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/skills/fetchSideMenu");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Side Bar Menu"
      );
    }
  }
);

//## Skills Actions

// Fetch all Skills
export const fetchSkills = createAsyncThunk(
  "skill/fetchSkills",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/skills/fetchSkills");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Skills"
      );
    }
  }
);


// Create a new Skill
export const createSkill = createAsyncThunk(
  "skill/createSkill",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`/api/skills/createSkill`, formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create Skill"
      );
    }
  }
);

// Update a Skill
export const updateSkill = createAsyncThunk(
  "skill/updateSkill",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.patch(`/api/skills/updateSkill`, payload);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update Skill"
      );
    }
  }
);

// Delete a Skill
export const deleteSkill = createAsyncThunk(
  "skill/deleteSkill",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/skills/deleteSkill/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Delete Skill"
      );
    }
  }
);

//## Category Actions

// Fetch all Categories
export const fetchCategories = createAsyncThunk(
  "skill/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/skills/fetchCategories");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Categories"
      );
    }
  }
);


// Create a new Category
export const createCategory = createAsyncThunk(
  "skill/createCategory",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`/api/skills/createCategory`, formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create Category"
      );
    }
  }
);

// Update a Category
export const updateCategory = createAsyncThunk(
  "skill/updateCategory",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.patch(`/api/skills/updateCategory`, payload);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update Category"
      );
    }
  }
);

// Delete a Category
export const deleteCategory = createAsyncThunk(
  "skill/deleteCategory",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/skills/deleteCategory/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Delete Category"
      );
    }
  }
);

// Fetch all Topics
export const fetchTopics = createAsyncThunk(
  "skill/fetchTopics",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/skills/fetchTopics");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Topics"
      );
    }
  }
);


// Create a new Topic
export const createTopic = createAsyncThunk(
  "skill/createTopic",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`/api/skills/createTopic`, formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create Topic"
      );
    }
  }
);

// Update a Topic
export const updateTopic = createAsyncThunk(
  "skill/updateTopic",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.patch(`/api/skills/updateTopic`, payload);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update Topic"
      );
    }
  }
);

// Delete a Topic
export const deleteTopic = createAsyncThunk(
  "skill/deleteTopic",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/skills/deleteTopic/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Delete Topic"
      );
    }
  }
);


// ================== SLICE ==================

const skillSlice = createSlice({
  name: "SkillSlice",
  initialState: {
    sideMenu: [],
    skills: [],
    categories: [],
    topics: [],
    sidebarOpen: true,
    loading: false,
    error: null,
  },
  reducers: {
    // Add this reducer
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
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
      // Fetch Side Menu
      .addCase(fetchSideMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSideMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.sideMenu = action.payload;
      })
      .addCase(fetchSideMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
      });
  },
});

export const { resetSkillsState, toggleSidebar } = skillSlice.actions;
export default skillSlice.reducer;
