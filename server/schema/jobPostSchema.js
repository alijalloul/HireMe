import mongoose from "mongoose";

const JobPostSchema = mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  category: { type: String, required: true },
  skills: [],
  experienceRequired: { type: String },
  jobType: { type: String },
  description: { type: String },
  date: { type: Date, default: new Date() },
  status: { type: String, required: true },

  employerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employer",
    required: true,
  },
});

const jobPostDB = mongoose.model("jobPost", JobPostSchema);

export default jobPostDB;
