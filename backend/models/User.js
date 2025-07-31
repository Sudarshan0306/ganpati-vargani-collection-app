// /server/models/User.js
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    phone: { type: String },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "collector"], default: "collector" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
