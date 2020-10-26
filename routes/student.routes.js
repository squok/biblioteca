const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/jwt-validators");
const { fieldValidators } = require("../middlewares/field-validators");
const {
  createStudent,
  updateStudent,
  getStudent,
  deleteStudent,
} = require("../controllers/student.controllers");
const router = Router();
//crear
router.post(
  "/",
  validateJWT,
  [
    check("name", "Nombre es Obligatorio").not().isEmpty(),
    check("course", "El curso es Obligatorio").not().isEmpty(),
    //middleware de los errores
    fieldValidators,
  ],
  createStudent
);
//actualizar
router.put("/:id", validateJWT, updateStudent);
//obtener
router.get("/", validateJWT, getStudent);
//borrar
router.delete("/:id", validateJWT, deleteStudent);
module.exports = router;
