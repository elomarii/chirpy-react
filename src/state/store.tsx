import { configureStore } from "@reduxjs/toolkit";
import { sitedataReducer } from "./reducerSitedata";

export const store = configureStore({
  reducer: {
    sitedata: sitedataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
