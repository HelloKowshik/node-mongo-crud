const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 5,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 5,
  },
});

module.exports = mongoose.model('Employee', employeeSchema);
