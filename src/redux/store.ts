import { configureStore } from "@reduxjs/toolkit";
import darkOrLightModeSlice from "./features/darkOrLightMode/darkOrLightModeSlice";

export default configureStore({
  reducer: {
    darkOrLightMode: darkOrLightModeSlice,
  },
});
