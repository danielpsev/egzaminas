const express = require("express");
const router = express.Router();

const {
  requireAuth,
  requireAdmin,
} = require("../middlewares/authMiddleware");
const {
  getCategories,
  getAllProcedures,
  getProcedure,
  addProcedure,
  deleteProcedure,
  editProcedure
} = require("../controllers/procedureController.js");

router.route("/categories").get(requireAuth, getCategories);

router.route("/").get(requireAuth, getAllProcedures);
router.route("/:id").get(requireAuth, getProcedure);
router.route("/").post(requireAuth, requireAdmin, addProcedure);
router.route("/:id").delete(requireAuth, requireAdmin, deleteProcedure);
router.route("/:id").patch(requireAuth, requireAdmin, editProcedure);
module.exports = router;
