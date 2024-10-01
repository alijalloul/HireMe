import bcrypt from "bcryptjs";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import https from "https";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import employeeDB from "./schema/employeeSchema.js";
import employerDB from "./schema/employerSchema.js";
import userDB from "./schema/userSchema.js";

import auth from "./middleware/middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const PORT = process.env.PORT || 5000;
const atlasURL = process.env.MONGODB_URL;

if (process.env.PORT) {
  console.log("PORT EXISTS");
  function pingWebsite() {
    https
      .get(
        "https://aihubcentral-server.onrender.com/",
        (res) => {
          console.log(
            "Website pinged successfully"
          );
        }
      )
      .on("error", (err) => {
        console.error(
          "Error while pinging website:",
          err
        );
      });
  }

  // Ping website every 14 minutes (840000 milliseconds)
  setInterval(pingWebsite, 840000);
}

mongoose
  .connect(atlasURL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Successfully connected to port ${PORT}`
      )
    )
  )
  .catch((error) =>
    console.log("There was an error: ", error)
  );

app.get("/", async (req, res) => {
  res.status(500).send("Server is RUNNING");
});

app.post("/users/signup", async (req, res) => {
  console.log("signup user");
  const { name, telephone, password, pushToken } =
    req.body;

  try {
    const existingUser = await userDB.findOne({
      telephone,
    });

    if (existingUser) {
      console.log("same User");
      return res.status(400).json({
        message: "Account already exists.",
      });
    }

    const hashedPass = await bcrypt.hash(
      password,
      12
    );

    const result = await userDB.create({
      name,
      telephone,
      password: hashedPass,
      pushToken,
    });
    const token = jwt.sign(
      {
        telephone: result.telephone,
        id: result._id,
      },
      "sk"
    );

    res.status(200).json({ result, token });
  } catch (error) {
    console.log(
      "Error from signup backend: ",
      error
    );
    res.status(500).json({ message: error });
  }
});

app.post("/users/login", async (req, res) => {
  console.log("login");
  const { telephone, password } = req.body;

  try {
    const existingUser = await userDB.findOne({
      telephone: telephone,
    });

    if (!existingUser)
      return res
        .status(404)
        .json({ message: "User doesn't exist" });

    const validPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!validPassword)
      return res
        .status(400)
        .json({ message: "Invalid password" });

    const token = jwt.sign(
      {
        telephone: existingUser.telephone,
        id: existingUser._id,
      },
      "sk"
    );

    const isEmployee = await employeeDB.findOne({
      telephone: telephone,
    });
    const user = isEmployee
      ? {
          ...(
            await employeeDB.findOne({
              telephone: telephone,
            })
          )._doc,
          type: "employee",
        }
      : {
          ...(
            await employerDB.findOne({
              telephone: telephone,
            })
          )._doc,
          type: "employer",
        };

    res.status(200).json({ result: user, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
});

app.patch("/user", auth, async (req, res) => {
  console.log("update user");

  const body = req.body;

  try {
    await userDB.findByIdAndUpdate(
      body._id,
      { name: body.name },
      { new: true }
    );

    let newUser = -1;
    if (body.type === "employee") {
      const employeeExists =
        await employeeDB.findOne({
          _id: body._id,
        });

      if (employeeExists) {
        newUser =
          await employeeDB.findByIdAndUpdate(
            body._id,
            body,
            { new: true }
          );
      } else {
        newUser = await employeeDB.create({
          ...body,
          _id: body._id,
        });
        await userDB.findByIdAndUpdate(
          body._id,
          { type: body.type },
          { new: true }
        );
      }
    } else {
      const employerExists =
        await employerDB.findOne({
          _id: body._id,
        });

      if (employerExists) {
        newUser =
          await employerDB.findByIdAndUpdate(
            body._id,
            body,
            { new: true }
          );
      } else {
        newUser = await employerDB.create({
          ...body,
          _id: body._id,
        });
        await userDB.findByIdAndUpdate(
          body._id,
          { type: body.type },
          { new: true }
        );
      }
    }

    res
      .status(200)
      .json({ ...newUser._doc, type: body.type });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
});

import {
  applyForJob,
  createJobPost,
  deleteJobPost,
  getAppliedEmployees,
  getJobPosts,
  getJobPostsAppliedToByUser,
  getJobPostsByFilter,
  getJobPostsBySearch,
  getJobPostsPostedByUser,
  hireEmployee,
  updateJobPost,
} from "./controller/userController.js";

// Retrieve job posts for a specific employer
app.get(
  "/employer/:employerId/:page/posts",
  getJobPostsPostedByUser
);

// Retrieve job posts for a specific employee
app.get(
  "/employee/:employeeId/:page/posts",
  getJobPostsAppliedToByUser
);

// Retrieve data of employees that applied for a specific job
app.get(
  "/job/:jobId/employees",
  getAppliedEmployees
);

// Hire an employee for a specific job post
app.get(
  "/job/:jobId/employee/:employeeId",
  hireEmployee
);

// Create a new job post
app.post("/post", createJobPost);

// Update a job post
app.patch("/post", auth, updateJobPost);

// Apply for a job
app.post("/application", applyForJob);

// Delete a specific job post
app.delete("/post/:id", deleteJobPost);

// Retrieve job posts
app.get("/posts/:page", getJobPosts);

// Retrieve job posts by search
app.get(
  "/posts/search/:searchQuery/:page",
  getJobPostsBySearch
);

// Retrieve job posts by filter
app.get("/filter", getJobPostsByFilter);
