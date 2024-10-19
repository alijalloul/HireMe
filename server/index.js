import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";

import applicationsRoute from "./routes/applications.js";
import authRoute from "./routes/auth.js";
import jobPostsRoute from "./routes/jobPosts.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "2mb" }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Successfully connected to port ${PORT}`));

app.get("/", async (req, res) => {
  res.status(500).send("Server is RUNNING");
});

app.use("/auth", authRoute);
app.use("/users", usersRouter);
app.use("/jobPosts", jobPostsRoute);
app.use("/applications", applicationsRoute);
