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

  // Extract filter values from query parameters
  const {
    company,
    location,
    country,
    category,
    skills,
    experienceRequired,
    jobType,
  } = req.query;

  try {
    const startIndex = (page - 1) * LIMIT; // Pagination logic

    // Count the total posts that match the filters
    const totalPosts = await db.jobPost.count({
      where: {
        status: "pending",
        ...(searchQuery.trim() !== "" && {
          OR: [
            { jobTitle: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
          ],
        }),
        ...(company && { company: { contains: company, mode: "insensitive" } }),
        ...(location && {
          location: { contains: location, mode: "insensitive" },
        }),
        ...(country && { country: { contains: country, mode: "insensitive" } }),
        ...(category && {
          category: { contains: category, mode: "insensitive" },
        }),
        ...(skills && { skills: { hasSome: skills.split(",") } }), // Assuming skills are stored as an array
        ...(experienceRequired && { experienceRequired }),
        ...(jobType && { jobType }),
      },
    });

    console.log("searchQuery: ", searchQuery);

    console.log(`(${jobType})`);

    console.log("totalPosts: ", totalPosts);

    // Get the filtered job posts with pagination
    const jobPosts = await db.jobPost.findMany({
      where: {
        status: "pending",
        ...(searchQuery.trim() !== "" && {
          OR: [
            { jobTitle: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
          ],
        }),
        ...(company && { company: { contains: company, mode: "insensitive" } }),
        ...(location && {
          location: { contains: location, mode: "insensitive" },
        }),
        ...(country && { country: { contains: country, mode: "insensitive" } }),
        ...(category && {
          category: { contains: category, mode: "insensitive" },
        }),
        ...(skills && { skills: { hasSome: skills.split(",") } }),
        ...(experienceRequired && { experienceRequired }),
        ...(jobType && { jobType }),
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
