import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      // Save token in localStorage (optional)
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.data.token);
      }

      return res.data; // must contain { user, token }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
