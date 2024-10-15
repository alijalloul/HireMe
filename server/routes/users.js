import express from "express";

import db from "../db/db.js";
import auth from "../middleware/middleware.js";

const router = express.Router();

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        image: body.image,
        profession: body.profession,
        email: body.email,
        address: body.address,
        introduction: body.introduction,
        workExperience: body.workExperience,
        education: body.education,
        language: body.language,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log("error updating the user: ", error);

    res.status(500).json({ message: error.message });
  }
});

router.get("/:employerId/jobPosts", auth, async (req, res) => {
  const { employerId } = req.params;

  try {
    const data = await db.jobPost.findMany({
      where: {
        employerId: employerId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    console.log("error fetching user job posts: ", error);

    res.status(500).json({
      message: "Error fetching job posts",
    });
  }
});

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    const jobPosts = await db.jobPost.findMany({
      where: { employerId: user.id },
    });

    return res.status(200).json({
      user,
      jobPosts,
    });
  } catch (error) {
    console.log("error detching the user: ", error);

    return res.status(400).json({ error: "Login failed" });
  }
});

export default router;
