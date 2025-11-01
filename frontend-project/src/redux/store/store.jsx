import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authslice";
import signupReducer from "../features/singupslice";

const store = configureStore({
  reducer: {
    auth: authReducer,
     signup: signupReducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ disables that warning
    }),
});

export default store;
