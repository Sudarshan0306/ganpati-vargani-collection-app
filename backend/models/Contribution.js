import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const contributionSchema = new mongoose.Schema(
  {
    campaignId: {
      type: ObjectId,
      ref: "Campaign",
      required: true,
      index: true,
    },
    donorId: { type: ObjectId, ref: "Donor", required: true, index: true },
    collectedBy: { type: ObjectId, ref: "User", required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    mode: {
      type: String,
      enum: ["cash", "upi", "card", "other"],
      default: "cash",
    },
    receiptNo: { type: String, trim: true },
    date: { type: Date, default: Date.now },
    notes: { type: String, trim: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

contributionSchema.index({ campaignId: 1, collectedBy: 1, date: -1 });

export default mongoose.model("Contribution", contributionSchema);
