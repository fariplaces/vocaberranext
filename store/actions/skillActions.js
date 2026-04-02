import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//## Skills Actions

// Fetch all Skills
export const fetchSkills = createAsyncThunk(
   "skill/fetchSkills",
   async (_, thunkAPI) => {
      try {
         const res = await axios.get("/api/skills/fetchSkills");
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to fetch Skills"
         );
      }
   }
);


// Create a new Skill
export const createSkill = createAsyncThunk(
   "skill/createSkill",
   async (formData, thunkAPI) => {
      try {
         const res = await axios.post(`/api/skills/createSkill`, formData);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to create Skill"
         );
      }
   }
);

// Update a Skill
export const updateSkill = createAsyncThunk(
   "skill/updateSkill",
   async (payload, thunkAPI) => {
      try {
         const res = await axios.patch(`/api/skills/updateSkill`, payload);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to update Skill"
         );
      }
   }
);

// Delete a Skill
export const deleteSkill = createAsyncThunk(
   "skill/deleteSkill",
   async (id, thunkAPI) => {
      try {
         const res = await axios.delete(`/api/skills/deleteSkill/${id}`);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to Delete Skill"
         );
      }
   }
);

//## Category Actions

// Fetch all Categories
export const fetchCategories = createAsyncThunk(
   "skill/fetchCategories",
   async (_, thunkAPI) => {
      try {
         const res = await axios.get("/api/skills/fetchCategories");
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to fetch Categories"
         );
      }
   }
);


// Create a new Category
export const createCategory = createAsyncThunk(
   "skill/createCategory",
   async (formData, thunkAPI) => {
      try {
         const res = await axios.post(`/api/skills/createCategory`, formData);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to create Category"
         );
      }
   }
);

// Update a Category
export const updateCategory = createAsyncThunk(
   "skill/updateCategory",
   async (payload, thunkAPI) => {
      try {
         const res = await axios.patch(`/api/skills/updateCategory`, payload);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to update Category"
         );
      }
   }
);

// Delete a Category
export const deleteCategory = createAsyncThunk(
   "skill/deleteCategory",
   async (id, thunkAPI) => {
      try {
         const res = await axios.delete(`/api/skills/deleteCategory/${id}`);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to Delete Category"
         );
      }
   }
);

// Fetch all Topics
export const fetchTopics = createAsyncThunk(
   "skill/fetchTopics",
   async (_, thunkAPI) => {
      try {
         const res = await axios.get("/api/skills/fetchTopics");
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to fetch Topics"
         );
      }
   }
);


// Create a new Topic
export const createTopic = createAsyncThunk(
   "skill/createTopic",
   async (formData, thunkAPI) => {
      try {
         const res = await axios.post(`/api/skills/createTopic`, formData);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to create Topic"
         );
      }
   }
);

// Update a Topic
export const updateTopic = createAsyncThunk(
   "skill/updateTopic",
   async (payload, thunkAPI) => {
      try {
         const res = await axios.patch(`/api/skills/updateTopic`, payload);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to update Topic"
         );
      }
   }
);

// Delete a Topic
export const deleteTopic = createAsyncThunk(
   "skill/deleteTopic",
   async (id, thunkAPI) => {
      try {
         const res = await axios.delete(`/api/skills/deleteTopic/${id}`);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to Delete Topic"
         );
      }
   }
);

// Fetch all Revision
export const fetchRevisions = createAsyncThunk(
   "skill/fetchRevisions",
   async (_, thunkAPI) => {
      try {
         const res = await axios.get("/api/skills/fetchRevisions");
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to fetch Revision"
         );
      }
   }
);


// Create a new Revision
export const createRevision = createAsyncThunk(
   "skill/createRevision",
   async (formData, thunkAPI) => {
      try {
         const res = await axios.post(`/api/skills/createRevision`, formData);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to create Revision"
         );
      }
   }
);

// Update a Revision
export const updateRevision = createAsyncThunk(
   "skill/updateRevision",
   async (payload, thunkAPI) => {
      try {
         const res = await axios.patch(`/api/skills/updateRevision`, payload);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to update Revision"
         );
      }
   }
);

// Delete a Revision
export const deleteRevision = createAsyncThunk(
   "skill/deleteRevision",
   async (id, thunkAPI) => {
      try {
         const res = await axios.delete(`/api/skills/deleteRevision/${id}`);
         return res.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to Delete Revision"
         );
      }
   }
);
