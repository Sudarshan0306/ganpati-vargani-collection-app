import { Router } from "express";
import { z } from "zod";
import { zodValidate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/auth.js";
import {
  createContribution,
  listContributions,
  updateContribution,
  deleteContribution,
} from "../controllers/contributionsController.js";

const router = Router();
router.use(requireAuth);

router.post(
  "/",
  zodValidate(
    z.object({
      body: z.object({
        campaignId: z.string().min(1),
        donorId: z.string().min(1),
        amount: z.number().positive(),
        mode: z.enum(["cash", "upi", "card", "other"]).default("cash"),
        receiptNo: z.string().optional(),
        date: z.string().datetime().optional(),
        notes: z.string().optional(),
      }),
    })
  ),
  createContribution
);

router.get("/", listContributions);
router.put("/:id", updateContribution);
router.delete("/:id", deleteContribution);

export default router;
