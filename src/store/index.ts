import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./modules/user";
import assetSlice from "./modules/asset";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const store = configureStore({
  reducer: {
    user: persistReducer(
      {
        key: "ams-usr",
        storage,
      },
      userSlice
    ),
    asset: persistReducer(
      {
        key: "ams-asset",
        storage,
      },
      assetSlice
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
