import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";

import applicationsRoute from "./routes/applications.js";
import authRoute from "./routes/auth.js";
import jobPostsRoute from "./routes/jobPosts.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();
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
