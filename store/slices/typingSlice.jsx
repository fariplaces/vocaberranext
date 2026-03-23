import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================== ASYNC THUNKS ==================


// Exercises and Tests Actions

// Fetch all Exercises and Tests
export const fetchExercises = createAsyncThunk(
  "typing/fetchExercises",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/typing/fetchExercises");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Exercises"
      );
    }
  }
);


// Create a new Exercises and Tests
export const createExercise = createAsyncThunk(
  "typing/createExercise",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`/api/typing/createExercise`, formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create Typing Record"
      );
    }
  }
);

// Update a Exercises and Tests
export const updateExercise = createAsyncThunk(
  "typing/updateExercise",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.patch(`/api/typing/updateExercise`, payload);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update Typing"
      );
    }
  }
);

// Delete a Exercises and Tests
export const deleteExercise = createAsyncThunk(
  "typing/deleteExercise",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/typing/deleteExercise/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Delete Typing"
      );
    }
  }
);


// Lessons Actions

// Fetch all Lessons
export const fetchLessons = createAsyncThunk(
  "typing/fetchLessons",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/typing/fetchLessons");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Lessons"
      );
    }
  }
);
// Exercise Types Actions

// Fetch all Exercise Types
export const fetchExerciseTypes = createAsyncThunk(
  "typing/fetchExerciseTypes",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/typing/fetchExerciseTypes");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Lessons"
      );
    }
  }
);

// Duration Actions

// Fetch all Durations
export const fetchDurations = createAsyncThunk(
  "typing/fetchDurations",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/typing/fetchDurations");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Durations"
      );
    }
  }
);

// Typing Actions

// Fetch all Typing Records
export const fetchTypings = createAsyncThunk(
  "typing/fetchTypings",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/typing/fetchTypings");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Durations"
      );
    }
  }
);

// Create a new Typing
export const createTyping = createAsyncThunk(
  "typing/createTyping",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`/api/typing/createTyping`, formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create Typing Record"
      );
    }
  }
);

// Update a Typing
export const updateTyping = createAsyncThunk(
  "typing/updateTyping",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.patch(`/api/typing/updateTyping`, payload);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update Typing"
      );
    }
  }
);

// Delete a Typing
export const deleteTyping = createAsyncThunk(
  "typing/deleteTyping",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/typing/deleteTyping/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Delete Typing"
      );
    }
  }
);

// ================== SLICE ==================

const typingSlice = createSlice({
  name: "TypingDetails",
  initialState: {
    exercises: [],
    lessons: [],
    exerciseTypes: [],
    durations: [],
    typingData: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetTypingState: (state) => {
      state.exercises = [];
      state.lessons = [];
      state.durations = [];
      state.typingData = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Exercise Types
      .addCase(fetchExerciseTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExerciseTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.exerciseTypes = action.payload;
      })
      .addCase(fetchExerciseTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Lessons
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = action.payload;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Durations
      .addCase(fetchDurations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDurations.fulfilled, (state, action) => {
        state.loading = false;
        state.durations = action.payload;
      })
      .addCase(fetchDurations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Typing
      .addCase(fetchTypings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTypings.fulfilled, (state, action) => {
        state.loading = false;
        state.typingData = action.payload;
      })
      .addCase(fetchTypings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Typing
      .addCase(createTyping.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTyping.fulfilled, (state, action) => {
        state.loading = false;
        state.typingData = [action.payload, ...state.typingData];
      })
      .addCase(createTyping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Typing
      .addCase(updateTyping.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTyping.fulfilled, (state, action) => {
        state.loading = false;
        // 1. Find the index of the record that was just updated
        const index = state.typingData.findIndex(
          (item) => item.id === action.payload.id
        );
        // 2. If found, replace the old object with the new one from the API
        if (index !== -1) {
          state.typingData[index] = action.payload;
        }
      })
      .addCase(updateTyping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Typing
      .addCase(deleteTyping.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTyping.fulfilled, (state, action) => {
        state.loading = false;
        state.typingData = state.typingData.filter(
          (item) => item.id !== action.meta.arg
        );
      })
      .addCase(deleteTyping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Exercises
      .addCase(fetchExercises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Exercise
      .addCase(createExercise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExercise.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = [action.payload, ...state.exercises];
      })
      .addCase(createExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Exercise
      .addCase(updateExercise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExercise.fulfilled, (state, action) => {
        state.loading = false;
        // 1. Find the index of the record that was just updated
        const index = state.exercises.findIndex(
          (item) => item.id === action.payload.id
        );
        // 2. If found, replace the old object with the new one from the API
        if (index !== -1) {
          state.exercises[index] = action.payload;
        }
      })
      .addCase(updateExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Exercise
      .addCase(deleteExercise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExercise.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = state.exercises.filter(
          (item) => item.id !== action.meta.arg
        );
      })
      .addCase(deleteExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // // Create
    // .addCase(createMeaning.fulfilled, (state, action) => {
    //   const { wordId, meaning } = action.payload;
    //   if (!state.meaningsByWord[wordId]) state.meaningsByWord[wordId] = [];
    //   state.meaningsByWord[wordId].push(meaning);
    // })
    // .addCase(createMeaning.rejected, (state, action) => {
    //   state.error = action.payload;
    // })

    // // Update
    // .addCase(updateMeaning.fulfilled, (state, action) => {
    //   const { wordId, meaning } = action.payload;
    //   state.meaningsByWord[wordId] = state.meaningsByWord[wordId].map((m) =>
    //     m.id === meaning.id ? meaning : m
    //   );
    // })
    // .addCase(updateMeaning.rejected, (state, action) => {
    //   state.error = action.payload;
    // })

    // // Delete
    // .addCase(deleteMeaning.fulfilled, (state, action) => {
    //   const { wordId, meaningId } = action.payload;
    //   state.meaningsByWord[wordId] = state.meaningsByWord[wordId].filter(
    //     (m) => m.id !== meaningId
    //   );
    // })
    // .addCase(deleteMeaning.rejected, (state, action) => {
    //   state.error = action.payload;
    // });
  },
});

export const { resetTypingState } = typingSlice.actions;
export default typingSlice.reducer;
