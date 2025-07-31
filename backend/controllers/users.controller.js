import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return res.status(409).json({ message: "Email already exists" });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    phone,
    passwordHash,
    role,
  });
  res
    .status(201)
    .json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
});

export const listUsers = asyncHandler(async (req, res) => {
  const rows = await User.find()
    .sort({ createdAt: -1 })
    .select("-passwordHash")
    .lean();
  res.json(rows);
});

export const getUser = asyncHandler(async (req, res) => {
  const row = await User.findById(req.params.id).select("-passwordHash");
  if (!row) return res.status(404).json({ message: "Not found" });
  res.json(row);
});

export const updateUser = asyncHandler(async (req, res) => {
  const { name, phone, role, isActive } = req.body;
  const row = await User.findByIdAndUpdate(
    req.params.id,
    { $set: { name, phone, role, isActive } },
    { new: true }
  ).select("-passwordHash");
  if (!row) return res.status(404).json({ message: "Not found" });
  res.json(row);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const row = await User.findByIdAndUpdate(
    req.params.id,
    { $set: { isActive: false } },
    { new: true }
  );
  if (!row) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deactivated" });
});
