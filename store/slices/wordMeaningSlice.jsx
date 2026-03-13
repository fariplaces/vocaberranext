import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/config/api.config";

// ================== ASYNC THUNKS ==================

// Fetch all meanings for a word
export const fetchMeanings = createAsyncThunk(
  "meanings/fetchAll",
  async (wordId, thunkAPI) => {
    try {
      const res = await API.get(`/words/${wordId}/meanings`);
      return { wordId, meanings: res.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch meanings"
      );
    }
  }
);

// Create a new meaning
export const createMeaning = createAsyncThunk(
  "meanings/create",
  async ({ wordId, meaningData }, thunkAPI) => {
    try {
      const res = await API.post(`/words/${wordId}/meanings`, meaningData);
      return { wordId, meaning: res.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create meaning"
      );
    }
  }
);

// Update a meaning
export const updateMeaning = createAsyncThunk(
  "meanings/update",
  async ({ wordId, meaningId, meaningData }, thunkAPI) => {
    try {
      const res = await API.put(
        `/words/${wordId}/meanings/${meaningId}`,
        meaningData
      );
      return { wordId, meaning: res.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update meaning"
      );
    }
  }
);

// Delete a meaning
export const deleteMeaning = createAsyncThunk(
  "meanings/delete",
  async ({ wordId, meaningId }, thunkAPI) => {
    try {
      await API.delete(`/words/${wordId}/meanings/${meaningId}`);
      return { wordId, meaningId };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete meaning"
      );
    }
  }
);

// ================== SLICE ==================

const wordMeaningSlice = createSlice({
  name: "meanings",
  initialState: {
    meaningsByWord: {}, // { [wordId]: [meanings] }
    loading: false,
    error: null,
  },
  reducers: {
    resetMeaningsState: (state) => {
      state.meaningsByWord = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchMeanings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeanings.fulfilled, (state, action) => {
        state.loading = false;
        state.meaningsByWord[action.payload.wordId] = action.payload.meanings;
      })
      .addCase(fetchMeanings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createMeaning.fulfilled, (state, action) => {
        const { wordId, meaning } = action.payload;
        if (!state.meaningsByWord[wordId]) state.meaningsByWord[wordId] = [];
        state.meaningsByWord[wordId].push(meaning);
      })
      .addCase(createMeaning.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update
      .addCase(updateMeaning.fulfilled, (state, action) => {
        const { wordId, meaning } = action.payload;
        state.meaningsByWord[wordId] = state.meaningsByWord[wordId].map((m) =>
          m.id === meaning.id ? meaning : m
        );
      })
      .addCase(updateMeaning.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteMeaning.fulfilled, (state, action) => {
        const { wordId, meaningId } = action.payload;
        state.meaningsByWord[wordId] = state.meaningsByWord[wordId].filter(
          (m) => m.id !== meaningId
        );
      })
      .addCase(deleteMeaning.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetMeaningsState } = wordMeaningSlice.actions;
export default wordMeaningSlice.reducer;

