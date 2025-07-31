// /server/models/Campaign.js
import mongoose from "mongoose";
const campaignSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true, unique: true }, // e.g., 2025
    name: {
      type: String,
      default: function () {
        return `Ganpati ${this.year}`;
      },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export default mongoose.model("Campaign", campaignSchema);
