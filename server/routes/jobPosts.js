import * as dotenv from "dotenv";
import express from "express";

import db from "../db/db.js"; // Use your existing Prisma client
import auth from "../middleware/middleware.js";

import { sendFCMv1Notification } from "../libs/sendFCMV1notification.js";

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
    type,
  } = req.query;

  try {
    const startIndex = (page - 1) * LIMIT; // Pagination logic

    // Count the total posts that match the filters
    const totalPosts = await db.jobPost.count({
      where: {
        status: "pending",
        ...(searchQuery.trim() !== "" && {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" } },
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
        ...(type && { type }),
      },
    });

    // Get the filtered job posts with pagination
    const jobPosts = await db.jobPost.findMany({
      where: {
        status: "pending",
        ...(searchQuery.trim() !== "" && {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" } },
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
        ...(type && { type }),
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
    console.log("error fetching the job posts: ", error);

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
        title: body.title,
        company: body.company,
        location: body.location,
        country: body.country,
        category: body.category,
        skills: body.skills,
        experienceRequired: body.experienceRequired,
        type: body.type,
        description: body.description,
        status: body.status,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.log("error updating the job post: ", error);

    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    await db.jobPost.delete({
      where: {
        id,
      },
    });

    res.status(200);
  } catch (error) {
    console.log("error deleting job post: ", error);

    res.status(500).json({ message: error.message });
  }
});

router.get("/:id/applicants", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const applications = await db.application.findMany({
      where: {
        jobId: id,
      },
      select: {
        coverLetter: true,
        employee: {
          select: {
            id: true,
            name: true,
            iconImage: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const employeesArr = [];

    applications.map((application) => {
      employeesArr.push({
        ...application.employee,
        coverLetter: application.coverLetter,
      });
    });

    res.status(200).json({ [id]: employeesArr });
  } catch (error) {
    console.log("Error fetching employees that applied to this job: ", error);

    res.status(500).json({
      error: "Error fetching employees that applied to this job",
    });
  }
});

router.get("/:jobId/hire/:employeeId", auth, async (req, res) => {
  const { jobId, employeeId } = req.params;

  try {
    const employeePushToken = await db.user.findUnique({
      where: { id: employeeId },
      select: { expoPushToken: true },
    });

    const jobTitle = await db.jobPost.findUnique({
      where: { id: jobId },
      select: { title: true },
    });

    await sendFCMv1Notification(
      employeePushToken.expoPushToken,
      "You got hired!",
      `Congratulations, you have been hired for the job: ${jobTitle.title}`
    );

    res.status(200).send("Hired successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error hiring employee" });
  }
});

export default router;
