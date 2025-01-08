import { createSlice } from "@reduxjs/toolkit";

interface NavbarState {
  show: boolean; // controlling navbar visibility on small devices
}

const navbarInitialState: NavbarState = {
  show: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState: navbarInitialState,
  reducers: {
    show: (state) => {
      document.body.setAttribute("sidebar-display", "");
      state.show = true;
    },
    hide: (state) => {
      if (state.show) {
        document.body.removeAttribute("sidebar-display");
        state.show = false;
      }
    },
  },
});

export const { show, hide } = navbarSlice.actions;
export const navbarReducer = navbarSlice.reducer;
