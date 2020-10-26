const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});
module.exports = mongoose.model("Student", studentSchema);
