import { configureStore } from "@reduxjs/toolkit";

import JobPost from "./JobPost";
import User from "./User";

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
