import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, loginUser, logoutUser, registerUser } from "@/store/actions/authActions";
import { SLICE_NAMES } from "@/store/constants/sliceConstants";

const authSlice = createSlice({
  name: SLICE_NAMES.GLOBAL,
  initialState: {
    user: null,
    loading: true,
    error: null,
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      // register
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      })
      // Me
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isLoggedIn = !!action.payload;
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"), (state) => { state.loading = true; state.error = null; }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"), (state, action) => { state.loading = false; state.error = action.payload; }
      )
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
