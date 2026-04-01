import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
   name: "GlobalSlice",
   initialState: {
      sidebarOpen: true,
   },
   reducers: {
      toggleSidebar: (state) => {
         state.sidebarOpen = !state.sidebarOpen;
      },
   }
});

export const { toggleSidebar } = globalSlice.actions;
export default globalSlice.reducer;