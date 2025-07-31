import { Router } from "express";
import { z } from "zod";
import { zodValidate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/auth.js";
import {
  createDonor,
  searchDonors,
  getDonor,
  updateDonor,
} from "../controllers/donorsController.js";

const router = Router();
router.use(requireAuth);

router.post(
  "/",
  zodValidate(
    z.object({
      body: z.object({
        name: z.string().min(1),
        address: z.string().optional(),
        area: z.string().optional(),
        phone: z.string().optional(),
      }),
    })
  ),
  createDonor
);

router.get("/", searchDonors);
router.get("/:id", getDonor);
router.put("/:id", updateDonor);

export default router;
