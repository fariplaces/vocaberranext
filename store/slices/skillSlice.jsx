import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================== ASYNC THUNKS ==================

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

// Fetch all Categories and Skills
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


// ================== SLICE ==================

const skillSlice = createSlice({
  name: "SkillSlice",
  initialState: {
    sideMenu: [],
    skills: [],
    sidebarOpen: true,
    loading: false,
    error: null,
  },
  reducers: {
    // Add this reducer
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    resetTypingState: (state) => {
      state.sideMenu = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Exercises
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
      // Fetch Exercises
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
      });
  },
});

export const { resetTypingState, toggleSidebar } = skillSlice.actions;
export default skillSlice.reducer;
