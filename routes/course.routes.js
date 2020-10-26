// /api/course

const { Router } = require("express");
const { check } = require("express-validator");
const {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controllers");
const { validateJWT } = require("../middlewares/jwt-validators");
const { fieldValidators } = require("../middlewares/field-validators");

const router = Router();
//crear
router.post(
  "/",
  validateJWT,
  [
    check("name", "Nombre es Obligatorio").not().isEmpty(),
    //middleware de los errores
    fieldValidators,
  ],
  createCourse
);
//obtener
router.get("/", validateJWT, getCourses);
//actualizar
router.put(
  "/:id",
  validateJWT,
  [
    check("name", "Nombre es Obligatorio").not().isEmpty(),
    //middleware de los errores
    fieldValidators,
  ],
  updateCourse
);
//borrar
router.delete("/:id", validateJWT, deleteCourse);

module.exports = router;
