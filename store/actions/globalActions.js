import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================== ASYNC THUNKS ==================

//## Side Menu Action

// Fetch all Side Menu
export const fetchSideMenu = createAsyncThunk(
   "skill/fetchSideMenu",
   async (_, thunkAPI) => {
      try {
         const res = await axios.get("/api/skills/fetchSideMenu");
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to fetch Side Bar Menu"
         );
      }
   }
);