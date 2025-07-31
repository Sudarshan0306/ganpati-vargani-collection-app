import { Router } from "express";
import { z } from "zod";
import { login, refresh, me } from "../controllers/authController.js";
// import { zodValidate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.post(
  "/login",
  // zodValidate(
  //   z.object({
  //     body: z.object({
  //       email: z.string().regex(/^[^@]+@[^@]+$/, "Invalid email"),
  //       password: z.string().min(6),
  //     }),
  //   })
  // ),
  login
);

router.post(
  "/refresh",
  // zodValidate(
  //   z.object({ body: z.object({ refreshToken: z.string().min(10) }) })
  // ),
  refresh
);

router.get("/me", requireAuth, me);

export default router;
