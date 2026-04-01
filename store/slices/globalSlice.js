


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
})