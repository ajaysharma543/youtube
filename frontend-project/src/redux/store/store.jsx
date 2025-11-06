import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authslice";
import signupReducer from "../features/singupslice";
import videoReducer from "../features/videoslice";
import userReducer from "../features/userdetailsslice";
import getvideoReducer from "../features/fetchvideoslice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    video: videoReducer,
    user: userReducer,
    videos: getvideoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
