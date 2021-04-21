const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  id: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  collegeId: {
    type: String,
    default: "",
  },
  skills: {
    type: Array,
    default: [],
  },
  batch: {
    type: Array,
    default: [],
  },
});

var Student = mongoose.model("collegeStudents", StudentSchema);
module.exports = Student;
