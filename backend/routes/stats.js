import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import {
  overview,
  totalsByUser,
  myStats,
} from "../controllers/statsController.js";

const router = Router();
router.use(requireAuth);

router.get("/overview", overview);
router.get("/by-user", totalsByUser);
router.get("/mine", myStats);

export default router;
