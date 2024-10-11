import express from "express";
import * as dotenv from "dotenv";

import db from "../db/db.js"; // Use your existing Prisma client
import auth from "../middleware/middleware.js";

dotenv.config();

const router = express.Router();

// Create a new job post
router.post("/", auth, async (req, res) => {
  const body = req.body;

  console.log(body);

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
  const searchQuery = req.query.search || ""; // Search query from the query string, default to an empty string if not provided
  const page = parseInt(req.query.page) || 1; // Get page number from query string, default to 1 if not provided
  const LIMIT = 8; // Set limit for pagination

  try {
    const startIndex = (page - 1) * LIMIT; // Calculate the starting index for pagination

    // Get the total count of job posts that match the search criteria
    const totalPosts = await db.jobPost.count({
      where: {
        status: "pending",
        jobTitle: {
          contains: searchQuery, // Perform a case-insensitive search on job titles
        },
      },
    });

    console.log("searchQuery: ", searchQuery);

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

    console.log("jobPosts: ", jobPosts);

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

export default router;
