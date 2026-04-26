import { SLICE_NAMES } from "@/store/constants/sliceConstants";
import { TYPING_FORM_KEYS } from "@/store/constants/typingConstants"; // Ensure this path is correct
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   // Add/Edit Popup
   [TYPING_FORM_KEYS.MANAGE_POPUP]: {
      [TYPING_FORM_KEYS.IS_OPEN]: false,
      [TYPING_FORM_KEYS.EDIT_ID]: null,
      [TYPING_FORM_KEYS.FORM_DATA]: {
         exerciseId: "",
         durationId: "",
         accuracy: "",
         gross: "",
         net: "",
      },
   },
   // Delete Popup
   [TYPING_FORM_KEYS.DELETE_POPUP]: {
      [TYPING_FORM_KEYS.IS_OPEN]: false,
      item: null, // Stores the whole object {id, title, etc.}
   },
};

const typingFormSlice = createSlice({
   name: SLICE_NAMES.TYPING_FORM,
   initialState,
   reducers: {
      // --- Manage Popup Actions ---
      openManagePopup: (state, action) => {
         const { editData, route, defaultDurationId } = action.payload;
         const manage = state[TYPING_FORM_KEYS.MANAGE_POPUP];

         manage[TYPING_FORM_KEYS.IS_OPEN] = true;
         manage[TYPING_FORM_KEYS.EDIT_ID] = editData?.id || null;

         if (editData) {
            // ✅ Explicit Mapping
            manage[TYPING_FORM_KEYS.FORM_DATA] = {
               exerciseId: editData.exerciseId || editData.exercise?.id || "",
               durationId: editData.durationId || editData.duration?.id || "",
               accuracy: editData.accuracy || "",
               gross: editData.gross || "",
               net: editData.net || "",
            };
         } else {
            manage[TYPING_FORM_KEYS.FORM_DATA] = {
               ...initialState[TYPING_FORM_KEYS.MANAGE_POPUP][TYPING_FORM_KEYS.FORM_DATA],
               durationId: route === "course" ? defaultDurationId : "",
            };
         }
      },

      closeManagePopup: (state) => {
         state[TYPING_FORM_KEYS.MANAGE_POPUP] = initialState[TYPING_FORM_KEYS.MANAGE_POPUP];
      },

      updateFormField: (state, action) => {
         const { name, value } = action.payload;
         // Access: managePopup -> formData -> [fieldName]
         state[TYPING_FORM_KEYS.MANAGE_POPUP][TYPING_FORM_KEYS.FORM_DATA][name] = value;
      },

      // --- Delete Popup Actions ---
      openDeletePopup: (state, action) => {
         const del = state[TYPING_FORM_KEYS.DELETE_POPUP];
         del[TYPING_FORM_KEYS.IS_OPEN] = true;
         del.item = action.payload;
      },

      closeDeletePopup: (state) => {
         state[TYPING_FORM_KEYS.DELETE_POPUP] = initialState[TYPING_FORM_KEYS.DELETE_POPUP];
      },
   },
});

export const {
   openManagePopup,
   closeManagePopup,
   updateFormField,
   openDeletePopup,
   closeDeletePopup,
} = typingFormSlice.actions;

export default typingFormSlice.reducer;