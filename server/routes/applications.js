import * as dotenv from "dotenv";
import express from "express";

import db from "../db/db.js"; // Use your existing Prisma client
import auth from "../middleware/middleware.js";

dotenv.config();

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const body = req.body;

  console.log("body:");

  try {
    const applied = await db.application.findUnique({
      where: {
        employeeId_jobId: {
          employeeId: body.employeeId,
          jobId: body.jobId,
        },
      },
    });

    if (applied) {
      console.log("user has already applied to this job");

      return res.status(404).json({
        message: "You have already applied to this job",
      });
    }

    await db.application.create({ data: body });
    res.status(200).json({});
  } catch (error) {
    console.error("error creating the application: ", error);

    res.status(500).json({
      message: "Error applying for job",
    });
  }
});

export default router;
