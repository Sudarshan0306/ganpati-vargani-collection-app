import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import  connectDb  from "../utils/db.js";
import User from "../models/User.js";
import Campaign from "../models/Campaign.js";

await connectDb(process.env.MONGO_URI);

const email = "admin@local.com";
const passwordHash = await bcrypt.hash("admin@123", 10);

const admin = await User.findOneAndUpdate(
  { email },
  {
    $set: { name: "Admin", email, passwordHash, role: "admin", isActive: true },
  },
  { new: true, upsert: true }
);

const year = 2025;
await Campaign.findOneAndUpdate(
  { year },
  { $setOnInsert: { year, name: `Ganpati ${year}`, isActive: true } },
  { new: true, upsert: true }
);

console.log("✅ Seeded admin:", admin.email);
await mongoose.disconnect();
process.exit(0);
