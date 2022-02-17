var User = require('../models/User');

exports.create_user_get = function(req, res, next) {
  res.render('signup');
}
exports.create_user_post = function(req, res, next) {
  res.send('signup POST route not yet completed');
}
exports.verify_user_get = function(req, res, next) {
  res.render('login');
}
exports.verify_user_post = function(req, res, next) {
  res.send('login POST route not yet completed');
}