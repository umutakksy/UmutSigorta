import express from "express";
import { aktiviteListele } from "../controllers/aktiviteController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("yonetici"), aktiviteListele);

export default router;