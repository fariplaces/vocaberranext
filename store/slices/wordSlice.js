import { createSlice } from "@reduxjs/toolkit";
import { createWord, deleteWord, fetchWords, updateWord } from "../actions/wordActions";

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
