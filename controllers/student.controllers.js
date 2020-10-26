const Student = require("../models/student.models");
const Course = require("../models/course.models");
const { response } = require("express");

const createStudent = async (req, res = response) => {
  try {
    const { course } = req.body;

    const checkCourse = await Course.findById(course);
    if (!checkCourse) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro el curso",
      });
    }
    //verificar el creador del curso
    if (checkCourse.createdBy.toString() !== req.uid) {
      res.status(401).json({
        ok: false,
        msg: "Curso no autorizado",
      });
    }
    const student = new Student(req.body);

    //guardar curso
    await student.save();
    res.json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};

const getStudent = async (req, res) => {
  try {
    //checkearque el curso y que sea valido
    const { course } = req.body;

    const checkCourse = await Course.findById(course);
    if (!checkCourse) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro el curso",
      });
    }
    //verificar el creador del curso
    if (checkCourse.createdBy.toString() !== req.uid) {
      res.status(401).json({
        ok: false,
        msg: "Curso no autorizado",
      });
    }
    const student = await Student.find({ course });
    res.json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    //checkear que el curso sea valido
    const { course, name } = req.body;

    //verificar si el alumno existe
    let student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        ok: false,
        msg: "No existe este alumno",
      });
    }
    const checkCourse = await Course.findById(course);
    //verificar el creador del curso sea el usuario autenticado
    if (checkCourse.createdBy.toString() !== req.uid) {
      res.status(401).json({
        ok: false,
        msg: "Curso no autorizado",
      });
    }

    //crear el nuevo alumno
    const updatedStudent = {};

    if (name) updatedStudent.name = name;
    //actualizar el alumno

    student = await Student.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedStudent },
      { new: true }
    );
    res.json({
      ok: true,
      student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    //checkear que el curso sea valido
    const { course } = req.body;

    //verificar si el alumno existe
    let student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        ok: false,
        msg: "No existe este alumno",
      });
    }
    const checkCourse = await Course.findById(course);
    //verificar el creador del curso sea el usuario autenticado
    if (checkCourse.createdBy.toString() !== req.uid) {
      res.status(401).json({
        ok: false,
        msg: "Curso no autorizado",
      });
    }
    //eliminar
    await Student.findOneAndRemove({ _id: req.params.id });
    res.json({
      ok: true,
      msg: "Alumno Eliminado",
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
  createStudent,
  updateStudent,
  getStudent,
  deleteStudent,
};
