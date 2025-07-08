import prisma from "../prismaClient.js";

// Crear cita
export const createCita = async (req, res) => {
  const { clienteId, servicioId, empleadoId, fecha, horaInicio, horaFin, estadoId } = req.body;
  try {
    const cita = await prisma.cita.create({
      data: { clienteId, servicioId, empleadoId, fecha, horaInicio, horaFin, estadoId },
    });
    res.json(cita);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las citas
export const getCitas = async (req, res) => {
  try {
    const citas = await prisma.cita.findMany({
      include: { cliente: true, servicio: true, empleado: true, estado: true, pagos: true },
    });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar estado de una cita
export const updateCita = async (req, res) => {
  const { id } = req.params;
  const { estadoId } = req.body;
  try {
    const cita = await prisma.cita.update({
      where: { id: Number(id) },
      data: { estadoId },
    });
    res.json(cita);
  } catch (error) {
    res.status(404).json({ error: "Cita no encontrada" });
  }
};

// Eliminar una cita
export const deleteCita = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cita.delete({ where: { id: Number(id) } });
    res.json({ message: "Cita eliminada" });
  } catch (error) {
    res.status(404).json({ error: "Cita no encontrada" });
  }
};