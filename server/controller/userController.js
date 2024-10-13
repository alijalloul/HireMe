import jobPostDB from "@/schema/jobPostsSchema";
import applicationDB from "@/schema/applicationSchema";
import employeeDB from "@/schema/employeeSchema";
import employerDB from "@/schema/employerSchema";

import { Expo } from "expo-server-sdk";
let expo = new Expo({
  accessToken:
    "2iTxaACfLEfIcLrhRHHBXy3LJMOApmSA8ySCP1ok",
});

export async function getJobPostsPostedByUser(
  req,
  res
) {
  console.log("getJobPostsPostedByUser"); // Added log
  const { employerId, page } = req.params;

  try {
    const LIMIT = 8;
    const startIndex = (page - 1) * LIMIT;
    const totalPosts =
      await jobPostDB.countDocuments({
        employerid: employerId,
      });

    const jobPosts = await jobPostDB
      .find({ employerid: employerId })
      .sort({ id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: jobPosts,
      numberOfPages: Math.ceil(
        totalPosts / LIMIT
      ),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      on({
        message: "Error fetching job posts",
      });
  }
}

export async function getJobPostsAppliedToByUser(
  req,
  res
) {
  console.log("getJobPostsAppliedToByUser"); // Added log
  const { employeeId, jobsStatus, page } =
    req.params;

  try {
    const LIMIT = 8;
    const startIndex = (page - 1) * LIMIT;
    const totalPosts = await applicationDB
      .find({ employeeid: employeeId })
      .populate("jobid")
      .countDocuments();

    const applications = await applicationDB
      .find({ employeeid: employeeId })
      .sort({ id: -1 })
      .limit(LIMIT)
      .skip(startIndex)
      .exec();

    const jobPosts = await Promise.all(
      applications.map(async (application) => {
        let jobPost = await jobPostDB.findOne({
          id: application.jobid,
        });
        if (jobPost) {
          jobPost._doc.coverLetter =
            application.coverLetter;
          return jobPost;
        }
        return;
      })
    );

    res
      .status(200)
      on({
        data: jobPosts,
        numberOfPages: Math.ceil(
          totalPosts / LIMIT
        ),
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      on({
        message: "Error fetching job posts",
      });
  }
}

export async function getAppliedEmployees(
  req,
  res
) {
  console.log("getAppliedEmployees"); // Added log
  const { jobId } = req.params;

  try {
    const applications = await applicationDB
      .find({ jobid: jobId })
      .sort({ id: -1 });

    const employeeData = await Promise.all(
      applications.map(async (application) => {
        let employee = await employeeDB.findOne({
          id: application.employeeid,
        });
        if (employee) {
          employee._doc.coverLetter =
            application.coverLetter;
          return employee;
        }
        return;
      })
    );

    res.status(200)on(employeeData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      on({
        message: "Error fetching applications",
      });
  }
}

export async function hireEmployee(req, res) {
  console.log("hireEmployee"); // Added log
  const { jobId, employeeId } = req.params;

  try {
    const employeePushToken = (
      await employeeDB.findById(employeeId)
    ).pushToken;

    const message = {
      to: employeePushToken,
      sound: "default",
      title: "You got hired!",
      body: "Congratulations, you have been hired for the job!",
    };

    await expo.sendPushNotificationsAsync([
      message,
    ]);

    await jobPostDB.findOneAndUpdate(
      { id: jobId },
      { status: "hired" },
      { new: true, lean: true }
    );
    await applicationDB.findOneAndUpdate(
      { jobid: jobId, employeeid: employeeId },
      { status: "hired" },
      { new: true, lean: true }
    );

    res.status(200).send("Hired successfully");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      on({ message: "Error hiring employee" });
  }
}

export async function createJobPost(req, res) {
  console.log("createJobPost"); // Added log
  const body = req.body;

  try {
    const newJobPost = await jobPostDB.create(
      body
    );
    res.status(200)on(newJobPost);
  } catch (error) {
    console.error(error);
    res
      .status(409)
      on({
        message: "Error creating job post",
      });
  }
}

export async function updateJobPost(req, res) {
  console.log("updateJobPost"); // Added log
  const body = req.body;

  try {
    const newJobPost = await jobPostDB
      .findByIdAndUpdate(body.id, body, {
        new: true,
        lean: true,
      })
      .exec();
    res.status(200)on(newJobPost);
  } catch (error) {
    console.error(error);
    res
      .status(409)
      on({
        message: "Error updating job post",
      });
  }
}

export async function deleteJobPost(req, res) {
  console.log("deleteJobPost"); // Added log
  const { id } = req.params;

  try {
    await jobPostDB.findByIdAndRemove(id);

    res.json({
      message: "Post deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      on({
        message: "Error deleting job post",
      });
  }
}

export async function getJobPosts(req, res) {
  console.log("getJobPosts"); // Added log
  const { page } = req.params;

  try {
    const LIMIT = 8;
    const startIndex = (page - 1) * LIMIT;
    const totalPosts =
      await jobPostDB.countDocuments({});

    const jobPosts = await jobPostDB
      .find({ status: "pending" })
      .sort({ id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: jobPosts,
      numberOfPages: Math.ceil(
        totalPosts / LIMIT
      ),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      on({
        message: "Error fetching job posts",
      });
  }
}

export async function getJobPostsBySearch(
  req,
  res
) {
  console.log("getJobPostsBySearch");

  const { searchQuery, page } = req.params;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;

    const searchRegex =
      searchQuery === "none"
        ? /.*/
        : new RegExp(searchQuery, "i");
    const totalPosts =
      await jobPostDB.countDocuments({
        $or: [
          { jobTitle: searchRegex },
          { description: searchRegex },
        ],
      });

    const posts = await jobPostDB
      .find({
        $or: [
          { jobTitle: searchRegex },
          { description: searchRegex },
        ],
      })
      .sort({ id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: posts,
      numberOfPages: Math.ceil(
        totalPosts / LIMIT
      ),
    });
  } catch (error) {
    res
      .status(409)
      on({ message: error.message });
  }
}

export async function getJobPostsByFilter(
  req,
  res
) {
  console.log("getJobPostsByFilter");

  const criteria = req.query;
  const { page } = req.params;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;

    const filter = {
      $and: [
        {
          $or: [
            {
              company:
                criteria.company !== "none"
                  ? new RegExp(
                      criteria.company || "",
                      "i"
                    )
                  : { $exists: true },
            },
            {
              location:
                criteria.location !== "none"
                  ? new RegExp(
                      criteria.location || "",
                      "i"
                    )
                  : { $exists: true },
            },
            {
              country:
                criteria.country !== "none"
                  ? new RegExp(
                      criteria.country || "",
                      "i"
                    )
                  : { $exists: true },
            },
          ],
        },
        {
          category: criteria.category || {
            $exists: true,
          },
        },
        {
          skills: criteria.skills || {
            $exists: true,
          },
        },
        {
          jobExpeerience:
            criteria.jobExperience || {
              $exists: true,
            },
        },
        {
          jobType: criteria.jobType || {
            $exists: true,
          },
        },
      ],
    };

    const totalPosts =
      await jobPostDB.countDocuments(filter);

    const posts = await jobPostDB
      .find(filter)
      .sort({ id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: posts,
      numberOfPages: Math.ceil(
        totalPosts / LIMIT
      ),
    });
  } catch (err) {
    res
      .status(409)
      on({ message: error.message });
  }
}

export async function applyForJob(req, res) {
  console.log("applyForJob"); // Added log
  const body = req.body;

  try {
    const applied = await applicationDB.findOne({
      employeeid: body.employeeid,
      jobid: body.jobid,
    });

    const employerPushToken = (
      await employerDB.findById(body.employerid)
    ).pushToken;
    const employeeName = (
      await employeeDB.findById(body.employeeid)
    ).name;
    const jobTitle = (
      await jobPostDB.findById(body.jobid)
    ).jobTitle;

    const message = {
      to: employerPushToken,
      sound: "default",
      title: "Someone has applied to your job",
      body: `${employeeName} has applied to "${jobTitle}"`,
    };

    await expo.sendPushNotificationsAsync([
      message,
    ]);

    if (applied) {
      return res
        .status(404)
        on({
          message:
            "You have already applied to this job",
        });
    }

    await applicationDB.create(body);
    res.status(200).send("Applied successfully");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      on({
        message: "Error applying for job",
      });
  }
}
