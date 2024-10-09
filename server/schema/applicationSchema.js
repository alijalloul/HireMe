import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
  jobid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobPost",
    required: true,
  },
  employeeid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  employerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employer",
    required: true,
  },
  status: { type: String, required: true },
  category: { type: String },
  coverLetter: { type: String, required: true },

  id: { type: String },
});

const applicationDB = mongoose.model("application", applicationSchema);

export default applicationDB;
