import { configureStore } from "@reduxjs/toolkit";

import JobPost from "./JobPost.js";
import User from "./User.js";

export default configureStore({
  reducer: {
    user: User,
    jobPosts: JobPost,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
