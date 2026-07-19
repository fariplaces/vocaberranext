import { createSelector } from "@reduxjs/toolkit";
import { EMPTY_ARRAY } from "../constants/sliceConstants";
import { UILIB_KEYS } from "../constants/uilibConstants";

// 1. Root Slice Selector
export const selectUilibState = (state) => state.uilib;

// 2. Base Selectors
export const selectAllUilibComponents = (state) =>
  selectUilibState(state)[UILIB_KEYS.COMPONENTS] || EMPTY_ARRAY;

export const selectUilibReadme = (state) =>
  selectUilibState(state)[UILIB_KEYS.README] || "";

export const selectUilibLoading = (state) =>
  selectUilibState(state)[UILIB_KEYS.LOADING] || false;

export const selectUilibError = (state) =>
  selectUilibState(state)[UILIB_KEYS.ERROR] || null;

// 3. Grouped-by-category view — mirrors the catalog sidebar/section layout
export const selectGroupedUilibComponents = createSelector(
  [selectAllUilibComponents],
  (components) => {
    const map = new Map();
    [...components]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .forEach((block) => {
        const cat = block.category || "Uncategorized";
        if (!map.has(cat)) map.set(cat, []);
        map.get(cat).push(block);
      });
    return Array.from(map.entries());
  }
);
