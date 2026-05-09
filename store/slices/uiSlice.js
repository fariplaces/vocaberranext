import { createSlice } from "@reduxjs/toolkit";
import {
  handleMessageFulfilled,
  handleMessageRejected,
} from "../utils/reduxHelpers";
import { SLICE_NAMES } from "../constants/sliceConstants";
const uiSlice = createSlice({
  name: SLICE_NAMES.UI,
  initialState: {
    notifications: [], // Global queue
  },
  reducers: {
    // Action to clear a notification after it has been toasted
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        handleMessageFulfilled,
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        handleMessageRejected,
      );
  },
});

export const { removeNotification } = uiSlice.actions;
export default uiSlice.reducer;
