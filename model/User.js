const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Admin: Number,
    Editor: Number,
  },
  password: {
    type: String,
    require: true,
    minlength: 4,
  },
  refreshToken: String,
});

module.exports = mongoose.model('User', userSchema);
