const { Schema, model } = require("mongoose");

//Definir Esquema Interno
const TicketSchema = new Schema({
  number: { type: Number, required: true },
  owner: { type: String, required: true },
  dateBuy: { type: Date, required: true },
  id: { type: Number, required: true },
});

//Definir Esquema Interno
const RifaSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  initialDate: { type: Date, required: true },
  finalDate: { type: Date, required: true },
  paymentMethods: { type: [String], required: true },
  quantityNumbers: { type: Number, required: true },
  code: { type: String, required: true },
  tickets: {
    type: [TicketSchema],
  },
});

//Definir Esquema Externo
const ProfileSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  codeUser: { type: String, required: true },
  rifas: [RifaSchema],
});

//Definir el modelo
const Profile = model("Profile", ProfileSchema);

//Exportar el modelo
module.exports = { Profile, ProfileSchema };
