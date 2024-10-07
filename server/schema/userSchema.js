import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String },

  pushToken: { type: String },
});

const userDB = mongoose.model("user", userSchema);

export default userDB;
