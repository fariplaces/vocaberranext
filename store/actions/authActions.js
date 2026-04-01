import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
export const loginUser = createAsyncThunk(
   "auth/loginUser",
   async ({ email, password }, thunkAPI) => {
      try {
         const res = await axios.post(
            "/api/login",
            { email, password },
            { withCredentials: true } // send cookies
         );
         return res.data.user;
      } catch (err) {
         return thunkAPI.rejectWithValue(
            err.response?.data?.message || err.message
         );
      }
   }
);

// Async thunk for register
export const registerUser = createAsyncThunk(
   "auth/registerUser",
   async ({ userName, email, password }, thunkAPI) => {
      try {
         const res = await axios.post(
            "/api/register",
            { userName, email, password },
            { withCredentials: true } // allow cookies if your API sets session
         );

         return res.data.user;
      } catch (err) {
         return thunkAPI.rejectWithValue(
            err.response?.data?.message || err.message
         );
      }
   }
);

// Async thunk for Me
export const checkAuth = createAsyncThunk(
   "auth/checkAuth",
   async (_, thunkAPI) => {
      try {
         const res = await axios.get("/api/me", { withCredentials: true });
         return res.data.user;
      } catch (err) {
         return thunkAPI.rejectWithValue(null);
      }
   }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
   "auth/logoutUser",
   async (_, thunkAPI) => {
      try {
         const res = await axios.post(
            "/api/logout",
            {},
            { withCredentials: true }
         );
         return res.data;
      } catch (err) {
         return thunkAPI.rejectWithValue(
            err.response?.data?.message || err.message
         );
      }
   }
);