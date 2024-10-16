import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  telephone: { type: String, required: true, trim: true },
  email: { type: String },
  address: { type: String },
  pdf: { type: String },
  image: { type: String },
  profession: { type: String },
  introduction: { type: String },
  workExperience: [],
  education: [],
  language: [],

  expoPushToken: { type: String },
  id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const employeeDB = mongoose.model("employee", employeeSchema);

export default employeeDB;
