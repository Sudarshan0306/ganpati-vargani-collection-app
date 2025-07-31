import asyncHandler from "express-async-handler";
import Contribution from "../models/Contribution.js";
import mongoose from "mongoose";

export const createContribution = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    collectedBy: req.user.id,
  };
  const doc = await Contribution.create(payload);
  res.status(201).json(doc);
});

export const listContributions = asyncHandler(async (req, res) => {
  const { campaignId, mine, limit = 50, dateFrom, dateTo } = req.query;
  const q = { deletedAt: null };
  if (campaignId) q.campaignId = new mongoose.Types.ObjectId(campaignId);
  if (mine === "true") q.collectedBy = new mongoose.Types.ObjectId(req.user.id);
  if (dateFrom || dateTo) {
    q.date = {};
    if (dateFrom) q.date.$gte = new Date(dateFrom);
    if (dateTo) q.date.$lte = new Date(dateTo);
  }
  const rows = await Contribution.find(q)
    .populate("donorId", "name phone")
    .populate("collectedBy", "name")
    .sort({ date: -1 })
    .limit(Number(limit));
  res.json(rows);
});

export const updateContribution = asyncHandler(async (req, res) => {
  const row = await Contribution.findById(req.params.id);
  if (!row || row.deletedAt)
    return res.status(404).json({ message: "Not found" });
  // only owner or admin
  if (req.user.role !== "admin" && row.collectedBy.toString() !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }
  Object.assign(row, req.body);
  await row.save();
  res.json(row);
});

export const deleteContribution = asyncHandler(async (req, res) => {
  const row = await Contribution.findById(req.params.id);
  if (!row || row.deletedAt)
    return res.status(404).json({ message: "Not found" });
  if (req.user.role !== "admin" && row.collectedBy.toString() !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }
  row.deletedAt = new Date();
  await row.save();
  res.json({ message: "Deleted" });
});
