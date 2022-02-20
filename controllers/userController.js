const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs/dist/bcrypt');
const passport = require('passport');

exports.create_user_get = function(req, res, next) {
  res.render('signup');
}

exports.create_user_post = [
  body('firstname').trim().isLength({min:1}).escape(),
  body('lastname').trim().isLength({min:1}).escape(),
  body('email').trim().isEmail().normalizeEmail(),
  body('username').trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      res.render('signup', {userInput: req.body});
    } else {
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
        }).save((err, user) => {
          if (err) {
            return next(err);
          }
          req.login(user, err => {
            if (err) {
              return next(err);
            }
            res.redirect('/');
          });
        });
      });
    }
  }
]

exports.verify_user_get = function(req, res, next) {
  res.render('login');
}

exports.verify_user_post = [
  body('email').trim().isEmail().normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
      res.render('login', { userInput: req.body });
    } else {
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
      })(req, res, next);
    }
  }
]

exports.logout_user_get = (req, res, next) => {
  req.logout();
  res.redirect('/');
}