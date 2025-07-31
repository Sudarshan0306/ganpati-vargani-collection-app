import asyncHandler from "express-async-handler";
import Contribution from "../models/Contribution.js";
import mongoose from "mongoose";

export const overview = asyncHandler(async (req, res) => {
  const { campaignId } = req.query;
  const match = { deletedAt: null };
  if (campaignId) match.campaignId = new mongoose.Types.ObjectId(campaignId);

  const [agg] = await Contribution.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
  ]);

  res.json({ totalAmount: agg?.totalAmount || 0, count: agg?.count || 0 });
});

export const totalsByUser = asyncHandler(async (req, res) => {
  const { campaignId } = req.query;
  const match = { deletedAt: null };
  if (campaignId) match.campaignId = new mongoose.Types.ObjectId(campaignId);

  const rows = await Contribution.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$collectedBy",
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 0,
        userId: "$user._id",
        name: "$user.name",
        totalAmount: 1,
        count: 1,
      },
    },
    { $sort: { totalAmount: -1 } },
  ]);

  res.json(rows);
});

export const myStats = asyncHandler(async (req, res) => {
  const { campaignId } = req.query;
  const match = {
    deletedAt: null,
    collectedBy: new mongoose.Types.ObjectId(req.user.id),
  };
  if (campaignId) match.campaignId = new mongoose.Types.ObjectId(campaignId);

  const [agg] = await Contribution.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
  ]);

  res.json({ totalAmount: agg?.totalAmount || 0, count: agg?.count || 0 });
});
