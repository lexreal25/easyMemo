import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import memoReducer from "./memoRedux";
import userReducer from "./userRedux";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
const persistConfig = {
  key: "user",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  user:userReducer,
  memo:memoReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);
