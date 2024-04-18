import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import inventorySlice from "./inventorySlice";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";



export const store = configureStore({
  reducer:{
    user: userSlice,
    inventory: inventorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
