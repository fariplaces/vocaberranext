// @/store/actions/typingActions.js
import { typingServices } from "@/services/client/typingServices";
import { TYPING_KEYS } from "../constants/typingConstants";
import { createServiceThunk } from "@/store/utils/thunkFactory";

const PREFIX = TYPING_KEYS.PREFIX;

/** 
 * FETCH OPERATIONS 
 */
export const fetchExercises = createServiceThunk(
    `${PREFIX}/fetchExercises`,
    (params) => typingServices.fetchExercises(params),
    { dataKey: TYPING_KEYS.EXERCISES, paginationKey: TYPING_KEYS.EXERCISE_PAGINATION, operation: "FETCH" }
);

export const fetchExerciseTypes = createServiceThunk(
    `${PREFIX}/fetchExerciseTypes`,
    () => typingServices.fetchExerciseTypes(),
    { dataKey: TYPING_KEYS.EXERCISE_TYPES, operation: "FETCH" }
);

export const fetchTypings = createServiceThunk(
    `${PREFIX}/fetchTypings`,
    (params) => typingServices.fetchTypings(params),
    { dataKey: TYPING_KEYS.TYPINGS, paginationKey:TYPING_KEYS.TYPING_PAGINATION, operation: "FETCH" }
);

export const fetchLessons = createServiceThunk(
    `${PREFIX}/fetchLessons`,
    () => typingServices.fetchLessons(),
    { dataKey: TYPING_KEYS.LESSONS, operation: "FETCH" }
);

export const fetchDurations = createServiceThunk(
    `${PREFIX}/fetchDurations`,
    () => typingServices.fetchDurations(),
    { dataKey: TYPING_KEYS.DURATIONS, operation: "FETCH" }
);

/** 
 * CREATE OPERATIONS 
 */
export const createExercise = createServiceThunk(
    `${PREFIX}/createExercise`,
    (payload) => typingServices.createExercise(payload),
    { dataKey: TYPING_KEYS.EXERCISES, operation: "CREATE" }
);

export const createTyping = createServiceThunk(
    `${PREFIX}/createTyping`,
    (payload) => typingServices.createTyping(payload),
    { dataKey: TYPING_KEYS.TYPINGS, operation: "CREATE" }
);

/** 
 * UPDATE OPERATIONS 
 */
export const updateExercise = createServiceThunk(
    `${PREFIX}/updateExercise`,
    ({ id, ...payload }) => typingServices.updateExercise(id, payload),
    { dataKey: TYPING_KEYS.EXERCISES, operation: "UPDATE" }
);

export const updateTyping = createServiceThunk(
    `${PREFIX}/updateTyping`,
    ({ id, ...payload }) => typingServices.updateTyping(id, payload),
    { dataKey: TYPING_KEYS.TYPINGS, operation: "UPDATE" }
);

/** 
 * DELETE OPERATIONS 
 */
export const deleteExercise = createServiceThunk(
    `${PREFIX}/deleteExercise`,
    (id) => typingServices.deleteExercise(id),
    { dataKey: TYPING_KEYS.EXERCISES, operation: "DELETE" }
);

export const deleteTyping = createServiceThunk(
    `${PREFIX}/deleteTyping`,
    (id) => typingServices.deleteTyping(id),
    { dataKey: TYPING_KEYS.TYPINGS, operation: "DELETE" }
);