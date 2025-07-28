import express from "express";
import {
    teklifOlustur,
    musteriTeklifleriniGetir,
    calisanTeklifleriniGetir,
    teklifGuncelle,
} from "../controllers/teklifController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("musteri"), teklifOlustur);
router.get("/musteri", protect, authorizeRoles("musteri"), musteriTeklifleriniGetir);
router.get("/calisan", protect, authorizeRoles("calisan"), calisanTeklifleriniGetir);
router.put("/:id", protect, authorizeRoles("calisan"), teklifGuncelle);

export default router;
