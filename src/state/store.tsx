import { configureStore } from "@reduxjs/toolkit";
import { tocReducer } from "./reducerToc";
import { sitedataReducer } from "./reducerSitedata";

export const store = configureStore({
  reducer: {
    sitedata: sitedataReducer,
    toc: tocReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
