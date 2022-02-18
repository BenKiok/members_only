const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs/dist/bcrypt');

exports.create_user_get = function(req, res, next) {
  res.render('signup');
}

exports.create_user_post = [
  body('firstname').trim().isLength({min:1}).escape(),
  body('lastname').trim().isLength({min:1}).escape(),
  body('email').trim().isEmail().normalizeEmail(),
  body('username').trim().escape(),
  body('password').trim().isLength({min:1}).escape(),
  body('confirmPassword').trim().isLength({min:1}).escape(),
  (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        next(err);
      }
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        isMember: false
      }).save(err => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    })
  }
]

exports.verify_user_get = function(req, res, next) {
  res.render('login');
}

exports.verify_user_post = function(req, res, next) {
  res.send('login POST route not yet completed');
}