import express from "express";

import sharp from "sharp";
import db from "../db/db.js";
import auth from "../middleware/middleware.js";

const router = express.Router();

const compressBase64Image = async (base64Str) => {
  if (base64Str) {
    const base64Data = base64Str.replace(/^data:image\/\w+;base64,/, "");

    const imageBuffer = Buffer.from(base64Data, "base64");

    const compressedBuffer = await sharp(imageBuffer)
      .resize({ width: 100 })
      .jpeg({ quality: 20 })
      .toBuffer();

    const compressedBase64 = compressedBuffer.toString("base64");

    return `data:image/jpeg;base64,${compressedBase64}`;
  } else {
    return "";
  }
};

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const iconImage = await compressBase64Image(body.image);

  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        image: body.image,
        iconImage: iconImage,
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
      select: {
        id: true,
        email: true,
        name: true,
        accountType: true,
        telephone: true,
        address: true,
        image: true,
        introduction: true,
        profession: true,
        language: true,
        education: true,
        workExperience: true,
        expoPushToken: true,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log("error detching the user: ", error);

    return res.status(400).json({ error: "Login failed" });
  }
});

router.get("/:id/applications", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const applications = await db.application.findMany({
      where: {
        employeeId: id,
      },
      select: {
        job: true,
      },
    });

    const jobs = applications.map((application) => application.job);

    res.status(200).json(jobs);
  } catch (error) {
    console.log("error fetching applied to jobs: ", error);

    res.status(500).json({
      error: "Error fetching job posts",
    });
  }
});

export default router;
