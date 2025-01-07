import { createSlice } from "@reduxjs/toolkit";

interface TocState {
  headers: string[];
}

const tocInitialState: TocState = {
  headers: [],
};

const tocSlice = createSlice({
  name: "toc",
  initialState: tocInitialState,
  reducers: {
    set: (state, action) => {
      state.headers = action.payload;
    },
  },
});

export const { set } = tocSlice.actions;
export const tocReducer = tocSlice.reducer;
