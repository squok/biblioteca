/*
Ruta:/api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { fieldValidators } = require("../middlewares/field-validators");
const { authUser } = require("../controllers/auth.controller");

const router = Router();

router.post(
  "/",
  [
    check("password", "Password es Obligatorio").not().isEmpty(),
    check("email", "Email es Obligatorio").isEmail(),
    //middleware de los errores
    fieldValidators,
  ],
  authUser
);

module.exports = router;
