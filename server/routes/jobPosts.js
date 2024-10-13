import express from "express";
import * as dotenv from "dotenv";

import db from "../db/db.js"; // Use your existing Prisma client
import auth from "../middleware/middleware.js";

dotenv.config();

const router = express.Router();

// Create a new job post
router.post("/", auth, async (req, res) => {
  const body = req.body;

  try {
    const newJobPost = await db.jobPost.create({
      data: body,
    });
    res.status(200).json(newJobPost);
  } catch (error) {
    console.error(error);
    res.status(409).json({
      message: "Error creating job post",
    });
  }
});

// Update an existing job post
router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const updatedJobPost = await db.jobPost.update({
      where: { id },
      data: body, // Directly use body if it matches the schema
    });
    res.status(201).json(updatedJobPost);
  } catch (error) {
    console.error(error);
    res.status(409).json({
      message: "Error updating job post",
    });
  }
});

// Delete a job post
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    await db.jobPost.delete({
      where: { id },
    });

    res.json({
      message: "Post deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting job post",
    });
  }
});

router.get("/", auth, async (req, res) => {
  const searchQuery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const LIMIT = 3;

  try {
    const startIndex = (page - 1) * LIMIT; // Calculate the starting index for pagination

    // Get the total count of job posts that match the search criteria
    const totalPosts = await db.jobPost.count({
      where: {
        status: "pending",
        ...(searchQuery !== "none" && {
          jobTitle: {
            contains: searchQuery, // Perform a case-insensitive search on job titles
          },
        }),
      },
    });

    const jobPosts = await db.jobPost.findMany({
      where: {
        status: "pending",
        ...(searchQuery !== "none" && {
          OR: [
            {
              jobTitle: {
                contains: searchQuery,
              },
            },
            {
              description: {
                contains: searchQuery,
              },
            },
          ],
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: startIndex,
      take: LIMIT,
    });

    res.json({
      data: jobPosts,
      numberOfPages: Math.ceil(totalPosts / LIMIT),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching job posts",
    });
  }
});

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const data = await db.jobPost.update({
      where: {
        id,
      },
      data: {
        jobTitle: body.jobTitle,
        company: body.company,
        location: body.location,
        country: body.country,
        category: body.category,
        skills: body.skills,
        experienceRequired: body.experienceRequired,
        jobType: body.jobType,
        description: body.description,
        status: body.status,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
