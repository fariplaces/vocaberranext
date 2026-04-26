import { TYPING_KEYS } from "../constants/typingConstants";
import { createServiceThunk } from "../utils/actionBuilder";
import { typingService } from "@/services/client/typingService";

const { PREFIX = "typing" } = TYPING_KEYS;

// --- Paginated Fetches ---
export const fetchTypings = createServiceThunk(
   `${PREFIX}/fetchTypings`,
   (params) => typingService.fetchTypings(params)
);

// --- CRUD Operations ---
export const createTyping = createServiceThunk(
   `${PREFIX}/createTyping`,
   (payload) => typingService.createTyping(payload)
);

// For Update, the 'arg' would be { id, ...data }
export const updateTyping = createServiceThunk(
   `${PREFIX}/updateTyping`,
   ({ id, ...payload }) => typingService.updateTyping(id, payload)
);