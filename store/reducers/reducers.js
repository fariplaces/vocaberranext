// @/store/reducers/reducer.js
import { combineReducers } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "@/store/constants/sliceConstants";

// Import all your slice reducers
import authReducer from "@/store/slices/authSlice";
import globalReducer from "@/store/slices/globalSlice";
import uiReducer from "@/store/slices/uiSlice";

// Typing Reducers
import typingReducer from "@/store/slices/typingSlices/typingSlice";
import typingFormReducer from "@/store/slices/typingSlices/typingFormSlice";

// Communication Reducers
import wordReducer from "@/store/slices/wordSlice";
import wordMeaningReducer from "@/store/slices/wordMeaningSlice";

// Skill Reducers
import skillReducer from "@/store/slices/skillSlices/skillSlice";
import skillFormReducer from "@/store/slices/skillSlices/skillFormSlice";

// Tasks Reducers
import taskReducer from "@/store/slices/taskSlice";

// Notes Reducers
import notesReducer from "@/store/slices/notesSlice";

// UI Lib Reducers
import uilibReducer from "@/store/slices/uilibSlice";
import uilibFormReducer from "@/store/slices/uilibFormSlice";

const rootReducer = combineReducers({
  [SLICE_NAMES.AUTH]: authReducer,
  [SLICE_NAMES.GLOBAL]: globalReducer,
  [SLICE_NAMES.UI]: uiReducer,

  [SLICE_NAMES.WORDS]: wordReducer,
  [SLICE_NAMES.WORD_MEANINGS]: wordMeaningReducer,

  // Typing Reducers
  [SLICE_NAMES.TYPING]: typingReducer,
  [SLICE_NAMES.TYPING_FORM]: typingFormReducer,

  [SLICE_NAMES.SKILL]: skillReducer,
  [SLICE_NAMES.SKILL_FORM]: skillFormReducer,
  [SLICE_NAMES.TASKS]: taskReducer,
  [SLICE_NAMES.NOTES]: notesReducer,
  [SLICE_NAMES.UILIB]: uilibReducer,
  [SLICE_NAMES.UILIB_FORM]: uilibFormReducer,
});
export default rootReducer;
