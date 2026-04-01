import { createSlice } from "@reduxjs/toolkit";
import { createMeaning, deleteMeaning, fetchMeanings, updateMeaning } from "../actions/vocabActions";

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

