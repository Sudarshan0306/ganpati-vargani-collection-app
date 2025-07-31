import { Router } from "express";
import { z } from "zod";
import { zodValidate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/role.js";
import {
  createUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const router = Router();
router.use(requireAuth, requireRole("admin"));

router.post(
  "/",
  zodValidate(
    z.object({
      body: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        password: z.string().min(6),
        role: z.enum(["admin", "collector"]).default("collector"),
      }),
    })
  ),
  createUser
);

router.get("/", listUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
