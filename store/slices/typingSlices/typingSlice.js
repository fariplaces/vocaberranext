import { createSlice } from "@reduxjs/toolkit";
import { TYPING_KEYS, TYPING_RESOURCE_MAP } from "../../constants/typingConstants";
import { SLICE_NAMES } from "../../constants/sliceConstants";
import { handleResourceFulfilled, handleResourcePending } from "@/store/utils/reduxHelpers";

const initialState = {
  [TYPING_KEYS.EXERCISES]: [],
  [TYPING_KEYS.LESSONS]: [],
  [TYPING_KEYS.EXERCISE_TYPES]: [],
  [TYPING_KEYS.DURATIONS]: [],
  [TYPING_KEYS.TYPINGS]: [],
  [TYPING_KEYS.TYPING_PAGINATION]: { currentPage: 1, lastPage: 1, hasMore: true, isFetchingMore: false },
  [TYPING_KEYS.EXERCISE_PAGINATION]: { currentPage: 1, lastPage: 1, hasMore: true, isFetchingMore: false },
  loading: false,
  filterMode: "course",
  error: null,
};

const typingSlice = createSlice({
  name: SLICE_NAMES.TYPING,
  initialState,
  reducers: {
    resetTypingState: () => ({ ...initialState }),
    setFilterMode: (state, action) => {
      state.filterMode = action.payload; // "course" or "test"
    },
  },
  extraReducers: (builder) => {
    builder

      // PENDING MATCHER
      .addMatcher(
        (action) => action.type.startsWith(`${SLICE_NAMES.TYPING}/`) && action.type.endsWith("/pending"),
        (state, action) => {
          const type = action.type;
          // Determine which pagination object to target
          const pKey = type.includes("Typing") ? TYPING_KEYS.TYPING_PAGINATION :
            type.includes("Exercise") ? TYPING_KEYS.EXERCISE_PAGINATION : null;

          handleResourcePending(state, action, pKey);
        }
      )

      // FULFILLED MATCHER (The Magic)

      // .addMatcher(
      //   (action) => action.type.startsWith(`${SLICE_NAMES.TYPING}/`) && action.type.endsWith("/fulfilled"),
      //   (state, action) => {
      //     const type = action.type;

      //     if (type.includes("Typing")) {
      //       handleResourceFulfilled(state, action, TYPING_KEYS.TYPINGS, TYPING_KEYS.TYPING_PAGINATION);
      //     }
      //     else if (type.includes("Exercise")) {
      //       handleResourceFulfilled(state, action, TYPING_KEYS.EXERCISES, TYPING_KEYS.EXERCISE_PAGINATION);
      //     }
      //     else if (type.includes("Lesson")) {
      //       handleResourceFulfilled(state, action, TYPING_KEYS.LESSONS);
      //     }
      //     else if (type.includes("Duration")) {
      //       handleResourceFulfilled(state, action, TYPING_KEYS.DURATIONS);
      //     }
      //   }
      // )

      .addMatcher(
        (action) => action.type.startsWith(`${SLICE_NAMES.TYPING}/`) && action.type.endsWith("/fulfilled"),
        (state, action) => {
          const type = action.type;

          // Find the matching resource configuration
          const resourceKey = Object.keys(TYPING_RESOURCE_MAP).find(key => type.includes(key));


          if (resourceKey) {
            const { dataKey, paginationKey } = TYPING_RESOURCE_MAP[resourceKey];

            handleResourceFulfilled(
              state,
              action,
              dataKey,
              paginationKey // Will be undefined for non-paginated resources, which is fine
            );
          }
        }
      )

      // REJECTED MATCHER
      .addMatcher(
        (action) => action.type.endsWith("/rejected") && action.type.startsWith(SLICE_NAMES.TYPING),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "Server Error";

          // Reset all specific fetching flags on error
          if (state[TYPING_KEYS.TYPING_PAGINATION]) state[TYPING_KEYS.TYPING_PAGINATION].isFetchingMore = false;
          if (state[TYPING_KEYS.EXERCISE_PAGINATION]) state[TYPING_KEYS.EXERCISE_PAGINATION].isFetchingMore = false;
        }
      );
  },
});

export const { resetTypingState, setFilterMode } = typingSlice.actions;
export default typingSlice.reducer;
