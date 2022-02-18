const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  isMember: {type: Boolean, required: true},
  isAdmin: {type: Boolean}
});

module.exports = mongoose.model('User', userSchema);