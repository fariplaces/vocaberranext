import { createSlice } from "@reduxjs/toolkit";
import { TYPING_KEYS } from "../../constants/typingConstants";
import { SLICE_NAMES } from "../../constants/sliceConstants";
import { handleResourceFulfilled, handleResourcePending } from "@/store/utils/reduxHelpers";
import * as actions from "@/store/actions/typingActions"

const allTypingActions = Object.values(actions);

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
        // 1. PENDING: Catches any 'pending' auth action
    builder.addMatcher(
      (action)=>allTypingActions.some((a) => a.pending?.match(action)),
      (state, action) => handleResourcePending(state, action)
    );
    // 2. FULFILLED: Catches any 'fulfilled' auth action
     builder.addMatcher(
         (action) => allTypingActions.some((a) => a.fulfilled?.match(action)),
         (state, action) => handleResourceFulfilled(state, action)
       );
    // 3. REJECTED: Catches any 'rejected' auth action
 builder.addMatcher(
      (action) => allTypingActions.some((a) => a.rejected?.match(action)),
      (state, action) => handleResourceRejected(state, action)
    );
  },
});

export const { resetTypingState, setFilterMode } = typingSlice.actions;
export default typingSlice.reducer;
