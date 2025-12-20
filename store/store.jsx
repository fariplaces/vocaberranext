// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export default store;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage in browser

import authReducer from "./slices/authSlice";
import wordReducer from "./slices/wordSlice";
import wordMeaningReducer from "./slices/wordMeaningSlice";

// combine reducers (if more slices later)
const rootReducer = combineReducers({
  auth: authReducer,
  words: wordReducer,
  wordMeanings: wordMeaningReducer,
});

// persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth slice
};

// wrap reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
