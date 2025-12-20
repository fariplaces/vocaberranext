import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/config/api.config"; // <-- using centralized axios instance

// ================== ASYNC THUNKS ==================

// Fetch all words
export const fetchWords = createAsyncThunk(
  "words/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/words");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch words"
      );
    }
  }
);

// Create a new word
export const createWord = createAsyncThunk(
  "words/create",
  async (wordData, thunkAPI) => {
    try {
      const res = await API.post("/words", wordData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create word"
      );
    }
  }
);

// Update a word
export const updateWord = createAsyncThunk(
  "words/update",
  async ({ id, wordData }, thunkAPI) => {
    try {
      const res = await API.put(`/words/${id}`, wordData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update word"
      );
    }
  }
);

// Delete a word
export const deleteWord = createAsyncThunk(
  "words/delete",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/words/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete word"
      );
    }
  }
);

// ================== SLICE ==================

const wordSlice = createSlice({
  name: "words",
  initialState: {
    words: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetWordsState: (state) => {
      state.words = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchWords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.loading = false;
        state.words = action.payload;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createWord.fulfilled, (state, action) => {
        state.words.push(action.payload);
      })
      .addCase(createWord.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update
      .addCase(updateWord.fulfilled, (state, action) => {
        state.words = state.words.map((w) =>
          w.id === action.payload.id ? action.payload : w
        );
      })
      .addCase(updateWord.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.words = state.words.filter((w) => w.id !== action.payload);
      })
      .addCase(deleteWord.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetWordsState } = wordSlice.actions;
export default wordSlice.reducer;
