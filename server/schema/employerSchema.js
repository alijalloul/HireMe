import mongoose from "mongoose";

const employerSchema = mongoose.Schema({
  name: { type: String, required: true },
  telephone: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  image: { type: String },

  expoPushToken: { type: String },
  id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const employerDB = mongoose.model("employer", employerSchema);

export default employerDB;
