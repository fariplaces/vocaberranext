import { SLICE_NAMES } from "@/store/constants/sliceConstants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   // Add/Edit Popup
   managePopup: {
      isOpen: false,
      editId: null,
      formData: {
         exerciseId: "",
         durationId: "",
         accuracy: "",
         gross: "",
         net: "",
      },
   },
   // Delete Popup
   deletePopup: {
      isOpen: false,
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
         state.managePopup.isOpen = true;
         state.managePopup.editId = editData?.id || null;

         if (editData) {
            // ✅ Enterprise Practice: Explicit Mapping
            state.managePopup.formData = {
               exerciseId: editData.exerciseId || editData.exercise?.id || "",
               durationId: editData.durationId || editData.duration?.id || "",
               accuracy: editData.accuracy || "",
               gross: editData.gross || "",
               net: editData.net || "",
            };
         } else {
            state.managePopup.formData = {
               ...initialState.managePopup.formData,
               durationId: route === "course" ? defaultDurationId : ""
            };
         }
      },
      closeManagePopup: (state) => {
         state.managePopup = initialState.managePopup;
      },
      updateFormField: (state, action) => {
         const { name, value } = action.payload;
         state.managePopup.formData[name] = value;
      },

      // --- Delete Popup Actions ---
      openDeletePopup: (state, action) => {
         state.deletePopup.isOpen = true;
         state.deletePopup.item = action.payload;
      },
      closeDeletePopup: (state) => {
         state.deletePopup = initialState.deletePopup;
      },
   },
});

export const {
   openManagePopup, closeManagePopup, updateFormField,
   openDeletePopup, closeDeletePopup
} = typingFormSlice.actions;

export default typingFormSlice.reducer;