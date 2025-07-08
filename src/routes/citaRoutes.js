import express from "express";
import { createCita, getCitas, updateCita, deleteCita } from "../controllers/citaController.js";

const router = express.Router();

router.post("/citas", createCita);
router.get("/citas", getCitas);
router.put("/citas/:id", updateCita);
router.delete("/citas/:id", deleteCita);

export default router;