import { SKILL_KEYS } from "@/store/constants/skillsConstants";
import {
  INITIAL_PAGINATION_STATE,
  SLICE_NAMES,
} from "@/store/constants/sliceConstants";
import * as actions from "@/store/actions/skillActions";
import { createSlice } from "@reduxjs/toolkit";
import {
  handleResourcePending,
  handleResourceFulfilled,
  handleResourceRejected,
} from "@/store/utils/reduxHelpers";

const initialState = {
  [SKILL_KEYS.SKILLS]: [],
  [SKILL_KEYS.CATEGORIES]: [],
  [SKILL_KEYS.TOPICS]: [],
  [SKILL_KEYS.REVISIONS]: [],

  [SKILL_KEYS.LOADING]: [],
  [SKILL_KEYS.ERROR]: [],
};

const allSkillActions = Object.values(actions);

const skillSlice = createSlice({
  name: SLICE_NAMES.SKILL,
  initialState,
  reducers: {
    resetSkillState: () => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    //1. PENDING: Catches any action which is in 'pending' state
    (builder.addMatcher(
      (action) => allSkillActions.some((a) => a.pending?.match(action)),
      (state, action) => handleResourcePending(state, action),
    ),
      //2. FULFILLED: Catches any action which is in 'fulfilled' state
      builder.addMatcher(
        (action) => allSkillActions.some((a) => a.fulfilled?.match(action)),
        (state, action) => handleResourceFulfilled(state, action),
      ),
      //3. REJECTED: Catches any action which is in 'rejected' state
      builder.addMatcher(
        (action) => allSkillActions.some((a) => a.rejected?.match(action)),
        (state, action) => handleResourceRejected(state, action),
      ));
  },
});

export const { resetSkillState } = skillSlice.actions;
export default skillSlice.reducer;
