const { Profile } = require("../models/Rifa.model");
const { codify, randomCode } = require("../middlewares/secure");
const { hashData, verifyPassword } = require("../middlewares/hashing");

// Obtener todos los usuarios
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

// Obtener un usuario por su ID (con autenticación)
const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.id);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingProfile = await Profile.findOne({ email });
    if (existingProfile) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Crear un código único para el usuario
    let codeUser;
    do {
      codeUser = randomCode(8);
    } while (await Profile.findOne({ codeUser }));

    // Crear el perfil
    const hashedPassword = await hashData(password);
    const profile = new Profile({
      name,
      lastName,
      email,
      password: hashedPassword,
      codeUser,
    });

    await profile.save();
    const token = await codify(profile);
    res.json({ message: "Usuario creado con éxito", token });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario", error });
  }
};

// Iniciar sesión
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isValidPassword = await verifyPassword(password, profile.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = await codify(profile);
    res.json({ message: "Usuario logueado con éxito", token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.id);
    const { name, lastName, email, password } = req.body;

    profile.name = name || profile.name;
    profile.lastName = lastName || profile.lastName;
    profile.email = email || profile.email;

    if (password) {
      profile.password = await hashData(password);
    }

    await profile.save();
    res.json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.user.id);
    res.json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

module.exports = {
  getAllProfiles,
  getProfileById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
