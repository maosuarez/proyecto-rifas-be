const { Router } = require("express");
const { decode } = require("../middlewares/secure");
const {
  getAllRifas,
  getRifaById,
  createRifa,
  updateRifa,
  deleteRifa,
  buyTicket,
  getRifasByUserCode,
} = require("../controllers/rifaController");

const router = Router();

router.get("/all", decode, getAllRifas);
router.get("/:id", decode, getRifaById);
router.post("/new", decode, createRifa);
router.put("/:id", decode, updateRifa);
router.delete("/:id", decode, deleteRifa);
router.post("/buy/:id", decode, buyTicket);
router.get("/user/:codeUser", getRifasByUserCode);

module.exports = router;
