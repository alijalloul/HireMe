import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";

// import bcrypt from "bcryptjs";
// import https from "https";
// import jwt from "jsonwebtoken";

// import employeeDB from "./schema/employeeSchema";
// import employerDB from "./schema/employerSchema";

// import auth from "./middleware/middleware";

import applicationsRoute from "./routes/applications.js";
import authRoute from "./routes/auth.js";
import jobPostsRoute from "./routes/jobPosts.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Successfully connected to port ${PORT}`));

app.get("/", async (req, res) => {
  res.status(500).send("Server is RUNNING");
});

app.use("/auth", authRoute);
app.use("/users", usersRouter);
app.use("/jobPosts", jobPostsRoute);
app.use("/applications", applicationsRoute);

// import {
//   applyForJob,
//   createJobPost,
//   deleteJobPost,
//   getAppliedEmployees,
//   getJobPosts,
//   getJobPostsAppliedToByUser,
//   getJobPostsByFilter,
//   getJobPostsBySearch,
//   getJobPostsPostedByUser,
//   hireEmployee,
//   updateJobPost,
// } from "./controller/userController";

// // Retrieve job posts for a specific employer
// app.get(
//   "/employer/:employerId/:page/posts",
//   getJobPostsPostedByUser
// );

// // Retrieve job posts for a specific employee
// app.get(
//   "/employee/:employeeId/:page/posts",
//   getJobPostsAppliedToByUser
// );

// // Retrieve data of employees that applied for a specific job
// app.get(
//   "/job/:jobId/employees",
//   getAppliedEmployees
// );

// // Hire an employee for a specific job post
// app.get(
//   "/job/:jobId/employee/:employeeId",
//   hireEmployee
// );

// // Create a new job post
// app.post("/post", createJobPost);

// // Update a job post
// app.patch("/post", auth, updateJobPost);

// // Apply for a job
// app.post("/application", applyForJob);

// // Delete a specific job post
// app.delete("/post/:id", deleteJobPost);

// // Retrieve job posts
// app.get("/posts/:page", getJobPosts);

// // Retrieve job posts by search
// app.get(
//   "/posts/search/:searchQuery/:page",
//   getJobPostsBySearch
// );

// // Retrieve job posts by filter
// app.get("/filter", getJobPostsByFilter);
