import asyncHandler from "express-async-handler";
import Donor from "../models/Donor.js";

export const createDonor = asyncHandler(async (req, res) => {
  const donor = await Donor.create(req.body);
  res.status(201).json(donor);
});

export const searchDonors = asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q) {
    const rows = await Donor.find().sort({ createdAt: -1 }).limit(50);
    return res.json(rows);
  }
  const regex = new RegExp(q, "i");
  const rows = await Donor.find({
    $or: [{ name: regex }, { phone: regex }, { area: regex }],
  }).limit(50);
  res.json(rows);
});

export const updateDonor = asyncHandler(async (req, res) => {
  const row = await Donor.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!row) return res.status(404).json({ message: "Not found" });
  res.json(row);
});

export const getDonor = asyncHandler(async (req, res) => {
  const row = await Donor.findById(req.params.id);
  if (!row) return res.status(404).json({ message: "Not found" });
  res.json(row);
});
