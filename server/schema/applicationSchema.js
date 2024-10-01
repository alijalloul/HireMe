import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: "jobPost", required: true },
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: "employee", required: true },
  employer_id: { type: mongoose.Schema.Types.ObjectId, ref: "employer", required: true },
  status: { type: String, required: true },
  category: { type: String },
  coverLetter: { type: String, required: true },

  id: { type: String },
});

const applicationDB = mongoose.model("application", applicationSchema);

export default applicationDB;
