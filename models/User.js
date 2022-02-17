var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  username: {type: String},
  email: {type: String, required: true},
  isMember: {type: Boolean, required: true},
  isAdmin: {type: Boolean}
});

module.exports = mongoose.model('User', userSchema);