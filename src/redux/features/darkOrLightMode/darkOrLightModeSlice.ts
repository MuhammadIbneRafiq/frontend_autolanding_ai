import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "",
};

const darkOrLightModeSlice = createSlice({
  name: "darkorlightmode",
  initialState,
  reducers: {
    setDarkOrLightMode(state, actions) {
      state.mode = actions.payload;
    },
  },
});

export const { setDarkOrLightMode } = darkOrLightModeSlice.actions;

export default darkOrLightModeSlice.reducer;
