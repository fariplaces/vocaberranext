import { createSlice } from "@reduxjs/toolkit";
import { fetchSideMenu } from "../actions/globalActions";

const globalSlice = createSlice({
   name: "GlobalSlice",
   initialState: {
      sideMenu: [],
      sidebarOpen: true,
      loading: false,
      error: null,
   },
   reducers: {
      toggleSidebar: (state) => {
         state.sidebarOpen = !state.sidebarOpen;
      },
      resetSkillsState: (state) => {
         state.sideMenu = [];
         sidebarOpen = true;
         state.loading = false;
         state.error = null;
      },
   },
   extraReducers: (builder) => {
      builder
         // Fetch Side Menu
         .addCase(fetchSideMenu.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchSideMenu.fulfilled, (state, action) => {
            state.loading = false;
            state.sideMenu = action.payload;
         })
         .addCase(fetchSideMenu.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
   }
});

export const { toggleSidebar } = globalSlice.actions;
export default globalSlice.reducer;