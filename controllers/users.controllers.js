const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.models");
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  const users = await User.find({}, "name email password");

  res.json({
    ok: true,
    users,
    uid: req.uid,
  });
};

const createUser = async (req, res = response) => {
  const { name, password, email } = req.body;

  try {
    //verificar email
    const emailExist = await User.findOne({ where: email });

    if (emailExist) {
      return res.status(400).json({
        ok: false,
        msg: "El Correo ya esta registrado",
      });
    }
    const user = new User(req.body);
    //hash pwd
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    //grabar en bbdd
    await user.save();

    //generar jwt
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user: user,
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
  getUsers,
  createUser,
};
