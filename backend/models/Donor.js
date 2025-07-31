// /server/models/Donor.js
import mongoose from "mongoose";
const donorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    area: { type: String, trim: true }, // mohalla/society/ward
    phone: { type: String, trim: true },
  },
  { timestamps: true, index: { name: 1, phone: 1 } }
);
export default mongoose.model("Donor", donorSchema);
