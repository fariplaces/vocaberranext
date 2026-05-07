//* ****************************************************
// HEADING: - Handle Resource Pending
//* ****************************************************

import { AUTH_KEYS } from "../constants/authConstants";

export const handleResourcePending = (state, action) => {
  const meta = action.meta;
  const paginationKey = meta?.resourceMeta?.paginationKey;
  const isPageFetch = meta?.arg?.page && meta.arg.page > 1;

  state.error = null;

  if (paginationKey && isPageFetch && state[paginationKey]) {
    state[paginationKey].isFetchingMore = true;
  } else {
    state.loading = true;
  }
};

//* ****************************************************
// HEADING: - Handle Resource Fulfilled
//* ****************************************************

export const handleResourceFulfilled = (state, action) => {
  // 1. Reset loading and errors
  state.loading = false;
  state.error = null;

  // 2. Extract our wrapper from the payload
  const resourceMeta = action.payload?.resourceMeta;
  const payloadData = action.payload?.payloadData;

  // Optional: Save the message globally
  if (payloadData?.message) {
    state.lastServerMessage = action.payload.message;
  }

  if (!resourceMeta) {
    console.warn("Helper: No resourceMeta found in payload for", action.type);
    return;
  }

  const { dataKey, paginationKey, operation } = resourceMeta;

  // 3. Extract the actual resource (User, Array, etc.)
  const resourceData = payloadData?.data;

  // 4. Handle Paginated Fetch
  if (paginationKey && payloadData?.current_page !== undefined) {
    const { data, current_page, last_page } = payloadData;
    const existingData = state[dataKey] || [];

    // Filter to prevent duplicate IDs if the API sends a cached item
    const newData = data.filter(
      (newItem) => !existingData.find((oldItem) => oldItem.id === newItem.id)
    );

    state[dataKey] = current_page === 1 ? data : [...existingData, ...newData];
    state[paginationKey] = {
      currentPage: current_page,
      lastPage: last_page,
      hasMore: current_page < last_page,
      isFetchingMore: false,
    };
    return;
  }

  // 5. Handle CRUD Operations
  switch (operation) {
    case "FETCH":
      state[dataKey] = resourceData;
      if (dataKey === AUTH_KEYS.USER) {
        // 1. Check if resourceData exists (not null/undefined)
        // 2. If it's an array, check if it has at least one item
        // 3. If it's an object, check if it has keys (like an ID)
        const hasContent = Array.isArray(resourceData)
          ? resourceData.length > 0
          : !!resourceData && Object.keys(resourceData).length > 0;

        state[AUTH_KEYS.IS_AUTHENTICATED] = hasContent;
      }
      break;

    case "CREATE":
      if (resourceData) {
        state[dataKey] = [resourceData, ...(state[dataKey] || [])];
      }
      break;

    case "UPDATE":
      if (resourceData) {
        const index = (state[dataKey] || []).findIndex(
          (item) => item.id === resourceData.id
        );
        if (index !== -1) state[dataKey][index] = resourceData;
      }
      break;

    case "DELETE":
      const id = action.meta?.arg?.id || action.meta?.arg;
      state[dataKey] = (state[dataKey] || []).filter((item) => item.id !== id);
      break;
  }

  if (paginationKey && state[paginationKey]) {
    state[paginationKey].isFetchingMore = false;
  }
};

//* ****************************************************
// HEADING: - Handle Resource Rejected
//* ****************************************************

export const handleResourceRejected = (state, action) => {
  const { paginationKey } = action.meta?.resourceMeta || {};

  state.loading = false;
  state.error = action.payload || "An unexpected error occurred";

  // If fetching more for a specific list, turn that specific spinner off
  if (paginationKey && state[paginationKey]) {
    state[paginationKey].isFetchingMore = false;
  }
};
