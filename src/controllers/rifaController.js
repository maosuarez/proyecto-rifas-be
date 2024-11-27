const { Profile } = require("../models/Rifa.model");

// Manejar errores y enviar una respuesta adecuada
const handleError = (res, error, message = "Error en el servidor") => {
  console.error(error);
  res.status(500).json({ message });
};

// Obtener todas las rifas del usuario autenticado
const getAllRifas = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.id).select("rifas");
    if (!profile)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(profile.rifas);
  } catch (error) {
    handleError(res, error, "Error al obtener las rifas");
  }
};

// Obtener una rifa específica por ID
const getRifaById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.id).select("rifas");
    const rifa = profile?.rifas.id(req.params.id);
    if (!rifa) return res.status(404).json({ message: "Rifa no encontrada" });
    res.json(rifa);
  } catch (error) {
    handleError(res, error, "Error al obtener la rifa");
  }
};

// Crear una nueva rifa
const createRifa = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.id);
    if (!profile)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const nuevaRifa = {
      ...req.body,
      code: Math.random().toString(36).substring(2, 10),
      tickets: [],
    };

    profile.rifas.push(nuevaRifa);
    await profile.save();
    res.status(201).json(nuevaRifa);
  } catch (error) {
    handleError(res, error, "Error al crear la rifa");
  }
};

// Actualizar una rifa existente
const updateRifa = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.id);
    const rifa = profile?.rifas.id(req.params.id);

    if (!rifa) return res.status(404).json({ message: "Rifa no encontrada" });

    Object.assign(rifa, req.body);
    await profile.save();
    res.json(rifa);
  } catch (error) {
    handleError(res, error, "Error al actualizar la rifa");
  }
};

// Eliminar una rifa
const deleteRifa = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.id);
    if (!profile)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const rifa = profile.rifas.id(req.params.id);
    if (!rifa) return res.status(404).json({ message: "Rifa no encontrada" });

    rifa.remove();
    await profile.save();
    res.json({ message: "Rifa eliminada con éxito" });
  } catch (error) {
    handleError(res, error, "Error al eliminar la rifa");
  }
};

// Comprar un ticket de una rifa
const buyTicket = async (req, res) => {
  try {
    const { number } = req.body;
    const profile = await Profile.findById(req.user.id);
    const rifa = profile?.rifas.id(req.params.id);

    if (!rifa) return res.status(404).json({ message: "Rifa no encontrada" });

    const existe = rifa.tickets.some((ticket) => ticket.number === number);
    if (existe) return res.status(400).json({ message: "Ticket ya comprado" });

    rifa.tickets.push({
      number,
      owner: req.user.email,
      dateBuy: new Date(),
      id: rifa.tickets.length + 1,
    });

    await profile.save();
    res.json({
      message: "Ticket comprado con éxito",
      ticket: rifa.tickets.at(-1),
    });
  } catch (error) {
    handleError(res, error, "Error al comprar el ticket");
  }
};

// Buscar rifas por el código del usuario
const getRifasByUserCode = async (req, res) => {
  try {
    const profile = await Profile.findOne({ codeUser: req.params.codeUser });
    if (!profile)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const rifa = profile.rifas.find((rifa) => rifa.code === req.query.codeRifa);
    if (!rifa) return res.status(404).json({ message: "Rifa no encontrada" });
    res.json(rifa);
  } catch (error) {
    handleError(res, error, "Error al buscar rifas");
  }
};

module.exports = {
  getAllRifas,
  getRifaById,
  createRifa,
  updateRifa,
  deleteRifa,
  buyTicket,
  getRifasByUserCode,
};
