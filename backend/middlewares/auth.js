import asyncHandler from "express-async-handler";
import { verifyAccessToken } from "../utils/jwt.js";
import User from "../models/User.js";

export const requireAuth = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Missing token" });

  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch {
    return res.status(401).json({ message: "Invalid/expired token" });
  }

  const user = await User.findById(decoded.sub).lean();
  if (!user || !user.isActive)
    return res.status(401).json({ message: "User inactive" });

  req.user = {
    id: user._id.toString(),
    role: user.role,
    name: user.name,
    email: user.email,
  };
  next();
});
