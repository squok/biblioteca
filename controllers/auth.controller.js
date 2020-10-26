const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const { generateJWT } = require("../helpers/jwt");

const authUser = async (req, res = response) => {
  //sacar email y pwd
  const { password, email } = req.body;

  try {
    //verificar email
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(400).json({
        ok: false,
        msg: "El email no existe",
      });
    }
    //revisar el pwd
    const correctPassword = await bcryptjs.compareSync(
      password,
      userDB.password
    );
    if (!correctPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    //crea el jwt y lo firma
    const token = await generateJWT(userDB.id);
    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};

module.exports = {
  authUser,
};
