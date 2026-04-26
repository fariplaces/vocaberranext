// @/store/actions/skillActions.js
import { createApiThunk } from "@/store/utils/actionBuilder-smart";

// Fetch all Side Menu
export const fetchSideMenu = createApiThunk(
   "menu",
   "fetchSideMenu",
   "get",
   "/skills/fetchSideMenu"
);