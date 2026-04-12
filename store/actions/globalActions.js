// @/store/actions/skillActions.js
import { createApiThunk } from "@/store/utils/actionBuilder";

// Fetch all Side Menu
export const fetchSideMenu = createApiThunk(
   "menu",
   "fetchSideMenu",
   "get",
   "/skills/fetchSideMenu"
);