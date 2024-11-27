//1. IMPORTAR DEPENDENCIAS
const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
const mongoose = require("mongoose");

//2. CONFIGURACION DE LA API
app.use(express.json());
app.use(cors());

// Conexión a MongoDB usando Mongoose
mongoose
  .connect(process.env.DB_USER)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB", err));

//USANDO ROUTES PARA SEPARAR EL CODIGO EN MODULOS

// Configuración de la ruta base y sus subrutas
app.use("/rifas", require("./routes/rifaRoutes"));
app.use("/profile", require("./routes/profileRoutes"));

// Capturar rutas no definidas (404)
app.use((req, res) => {
  res.status(404).json("Ruta no encontrada");
});

//3. INICIAR LA API
let port = process.env.PORT || 3000;
app.set("port", port);
app.listen(app.get("port"), "0.0.0.0", () => {
  console.log(`server is running on port ${port}`);
});
