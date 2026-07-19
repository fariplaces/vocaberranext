import { createSlice } from "@reduxjs/toolkit";
import {
  createUilibComponent,
  deleteUilibComponent,
  fetchUilibComponents,
  fetchUilibReadme,
  updateUilibComponent,
  updateUilibReadme,
} from "../actions/uilibActions";
import { SLICE_NAMES } from "../constants/sliceConstants";
import { UILIB_KEYS } from "../constants/uilibConstants";

const uilibSlice = createSlice({
  name: SLICE_NAMES.UILIB,
  initialState: {
    [UILIB_KEYS.COMPONENTS]: [],
    [UILIB_KEYS.README]: "",
    [UILIB_KEYS.LOADING]: false,
    [UILIB_KEYS.ERROR]: null,
  },
  reducers: {
    clearUilibError: (state) => {
      state[UILIB_KEYS.ERROR] = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ---- Components ----
      .addCase(fetchUilibComponents.fulfilled, (state, action) => {
        state[UILIB_KEYS.COMPONENTS] = action.payload;
      })
      .addCase(createUilibComponent.fulfilled, (state, action) => {
        state[UILIB_KEYS.COMPONENTS] = [
          action.payload,
          ...state[UILIB_KEYS.COMPONENTS],
        ];
      })
      .addCase(updateUilibComponent.fulfilled, (state, action) => {
        const updated = action.payload;
        state[UILIB_KEYS.COMPONENTS] = state[UILIB_KEYS.COMPONENTS].map((c) =>
          c.id === updated.id ? updated : c
        );
      })
      .addCase(deleteUilibComponent.fulfilled, (state, action) => {
        const id = action.meta?.arg?.id || action.meta?.arg;
        state[UILIB_KEYS.COMPONENTS] = state[UILIB_KEYS.COMPONENTS].filter(
          (c) => c.id !== id
        );
      })

      // ---- Readme ----
      .addCase(fetchUilibReadme.fulfilled, (state, action) => {
        state[UILIB_KEYS.README] = action.payload?.content ?? "";
      })
      .addCase(updateUilibReadme.fulfilled, (state, action) => {
        state[UILIB_KEYS.README] = action.payload?.content ?? state[UILIB_KEYS.README];
      })

      // ============================================================
      // GLOBAL MATCHERS — loading & error bookkeeping
      // ============================================================
      .addMatcher(
        (action) =>
          action.type.startsWith(`${UILIB_KEYS.PREFIX}/`) &&
          action.type.endsWith("/pending"),
        (state) => {
          state[UILIB_KEYS.ERROR] = null;
          state[UILIB_KEYS.LOADING] = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith(`${UILIB_KEYS.PREFIX}/`) &&
          action.type.endsWith("/fulfilled"),
        (state) => {
          state[UILIB_KEYS.LOADING] = false;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith(`${UILIB_KEYS.PREFIX}/`) &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state[UILIB_KEYS.LOADING] = false;
          state[UILIB_KEYS.ERROR] =
            action.payload || "An error occurred in the UI Lib module";
        }
      );
  },
});

export const { clearUilibError } = uilibSlice.actions;
export default uilibSlice.reducer;
