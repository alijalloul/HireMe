import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

import db from "../db/db.js";

import auth from "../middleware/middleware.js";

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Signup endpoint
router.post("/signup", async (req, res) => {
  const { name, email, password, accountType } = req.body;

  // Check if the user already exists
  const existingUser = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create a new user
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        accountType,
      },
    });

    return res.status(200).json({ message: "Signup successful." });
  } catch (error) {
    console.error("MongoDB Error:", error);
    return res.status(400).json({ error: "Signup failed" });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        accountType: user.accountType,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).json({ error: "Login failed" });
  }
});

export default router;
