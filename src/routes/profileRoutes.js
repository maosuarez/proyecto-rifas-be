const { Router } = require("express");
const router = Router();
const {
  getAllProfiles,
  getProfileById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/profileController");
const { decode } = require("../middlewares/secure");

// Rutas de usuario
router.get("/all", getAllProfiles); // Obtener todos los usuarios
router.get("/", decode, getProfileById); // Obtener usuario autenticado
router.post("/register", registerUser); // Registrar nuevo usuario
router.post("/login", loginUser); // Iniciar sesión
router.put("/", decode, updateUser); // Actualizar usuario autenticado
router.delete("/", decode, deleteUser); // Eliminar usuario autenticado

module.exports = router;
