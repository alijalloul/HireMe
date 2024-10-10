import express from "express";

import db from "../db/db.js";
import auth from "../middleware/middleware.js";

const router = express.Router();

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const userInfo = req.body;

  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        name: userInfo.name,
      },
    });

    res.status(200).json(user);
  } catch (error) {
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

    console.log("data: ", data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching job posts",
    });
  }
});

export default router;
