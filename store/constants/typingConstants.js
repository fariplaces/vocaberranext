
export const TYPING_KEYS = {


   // The Action Prefix (Namespace)
   PREFIX: "typing",

   // Data Arrays (State Keys)
   TYPINGS: "typings",
   EXERCISES: "exercises",
   LESSONS: "lessons",
   EXERCISE_TYPES: "exerciseTypes",
   DURATIONS: "durations",

   // Pagination Objects (State Keys)
   TYPING_PAGINATION: "typingPagination",
   EXERCISE_PAGINATION: "exercisePagination",
};

export const TYPING_FORM_KEYS = {
   MANAGE_POPUP: "managePopup",
   DELETE_POPUP: "deletePopup",
   FORM_DATA: "formData",
   IS_OPEN: "isOpen",
   EDIT_ID: "editId",
};


export const TYPING_RESOURCE_MAP = {
   Typing: {
      dataKey: TYPING_KEYS.TYPINGS,
      paginationKey: TYPING_KEYS.TYPING_PAGINATION
   },
   Exercise: {
      dataKey: TYPING_KEYS.EXERCISES,
      paginationKey: TYPING_KEYS.EXERCISE_PAGINATION
   },
   Lesson: {
      dataKey: TYPING_KEYS.LESSONS
   },
   Duration: {
      dataKey: TYPING_KEYS.DURATIONS
   },
   ExerciseType: {
      dataKey: TYPING_KEYS.EXERCISE_TYPES
   }
};