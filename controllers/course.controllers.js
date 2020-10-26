const Course = require("../models/course.models");
const { response } = require("express");

const createCourse = async (req, res = response) => {
  try {
    const course = new Course(req.body);

    //guardar con jwt
    course.createdBy = req.uid;
    //guardar curso
    course.save();
    res.json(course);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.uid });

    res.json({ ok: true, courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al encontrar cursos",
    });
  }
};

const updateCourse = async (req, res) => {
  const { name } = req.body;
  const updatedCourse = {};

  if (name) {
    updatedCourse.name = name;
  }
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      res.status(400).json({
        ok: false,
        msg: "Curso no actualizado",
      });
    }
    //verificar el creador del curso
    if (course.createdBy.toString() !== req.uid) {
      res.status(401).json({
        ok: false,
        msg: "Curso no autorizado",
      });
    }
    //update
    course = await Course.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updatedCourse },
      { new: true }
    );
    res.json({
      ok: true,
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "No se pudo actualizar",
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    //revisar el id
    let course = await Course.findById(req.params.id);
    //curso existe en la bbdd
    if (!course) {
      res.status(400).json({
        ok: false,
        msg: "Curso no actualizado",
      });
    }
    //verificar el creador del curso
    if (course.createdBy.toString() !== req.uid) {
      res.status(401).json({
        ok: false,
        msg: "Curso no autorizado",
      });
    }

    //Borrar el curso

    await Course.findOneAndDelete({ _id: req.params.id });
    res.json({
      ok: true,
      msg: "Curso eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "No se pudo Borrar",
    });
  }
};
module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
};
