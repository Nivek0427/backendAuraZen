import express from "express";
import { getCitas, updateCita, deleteCita } from "../controllers/citaController.js";
import prisma from "../../db/prismaClient.js"; // importa tu cliente Prisma aquí

const router = express.Router();

// Ruta temporal para crear cita simple desde el frontend actual
router.post('/citas', async (req, res) => {
  try {
    const { date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const citaCreada = await prisma.cita.create({
      data: {
        clienteId: 1,       // ← dummy data para pruebas
        servicioId: 1,
        empleadoId: 1,
        estadoId: 1,
        fecha: new Date(date),
        horaInicio: time,
        horaFin: time
      }
    });

    res.status(201).json(citaCreada);
  } catch (error) {
    console.error("Error al crear cita:", error);
    res.status(500).json({ error: "Error interno al crear la cita" });
  }
});

// Rutas existentes
router.get("/citas", getCitas);
router.put("/citas/:id", updateCita);
router.delete("/citas/:id", deleteCita);

export default router;