const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "sales"], required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
