/*
Ruta:/api/users
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { fieldValidators } = require("../middlewares/field-validators");
const { validateJWT } = require("../middlewares/jwt-validators");
const { getUsers, createUser } = require("../controllers/users.controllers");

const router = Router();
//obtener usuarios
router.get("/", validateJWT, getUsers);
//crear usuarios
router.post("/", createUser);

module.exports = router;
