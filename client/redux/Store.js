import { configureStore } from "@reduxjs/toolkit";

import JobPost from "./JobPost";
import User from "./User";

import { authMiddleware } from "./middleware/authMiddleware.js"; // Adjust the import path as needed

export default configureStore({
  reducer: {
    user: User,
    jobPosts: JobPost,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});
