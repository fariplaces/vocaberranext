// @/store/reducers/reducer.js
import { combineReducers } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "@/store/constants/sliceConstants";

// Import all your slice reducers
import authReducer from "@/store/slices/authSlice";
import globalReducer from "@/store/slices/globalSlice";

// Typing Reducers
import typingReducer from "@/store/slices/typingSlices/typingSlice";
import typingFormReducer from "@/store/slices/typingSlices/typingFormSlice";

// Communication Reducers
import wordReducer from "@/store/slices/wordSlice";
import wordMeaningReducer from "@/store/slices/wordMeaningSlice";

// Skill Reducers
import skillReducer from "@/store/slices/skillSlice";

// Tasks Reducers
import taskReducer from "@/store/slices/taskSlice";

// Notes Reducers
import notesReducer from "@/store/slices/notesSlice";

const rootReducer = combineReducers({
   [SLICE_NAMES.AUTH]: authReducer,
   [SLICE_NAMES.GLOBAL]: globalReducer,
   [SLICE_NAMES.WORDS]: wordReducer,
   [SLICE_NAMES.WORD_MEANINGS]: wordMeaningReducer,

   // Typing Reducers
   [SLICE_NAMES.TYPING]: typingReducer,
   [SLICE_NAMES.TYPING_FORM]: typingFormReducer,

   [SLICE_NAMES.SKILL]: skillReducer,
   [SLICE_NAMES.TASKS]: taskReducer,
   [SLICE_NAMES.NOTES]: notesReducer,
});
export default rootReducer