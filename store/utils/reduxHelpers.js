// @/store/utils/reduxHelpers.js

export const handlePaginatedFulfilled = (state, action, dataKey, paginationKey) => {
   state.loading = false;
   state.fetchingMore = false;

   const { data, current_page, last_page } = action.payload;

   // Use Bracket Notation to access the state dynamically
   const newData = data.filter(
      (newItem) => !state[dataKey].find((oldItem) => oldItem.id === newItem.id)
   );

   state[dataKey] = (current_page === 1) ? data : [...state[dataKey], ...newData];

   state[paginationKey] = {
      currentPage: current_page,
      lastPage: last_page,
      hasMore: current_page < last_page,
   };
};