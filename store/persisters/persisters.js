import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { SLICE_NAMES } from "../constants/sliceConstants";
import rootReducer from "../reducers/reducers";

const persistConfig = {
   key: "root",
   storage,
   whitelist: [SLICE_NAMES.AUTH], // Keep user logged in after refresh
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);