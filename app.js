const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

const indexRouter = require('./routes/index');
const mainRouter = require('./routes/main');
const User = require('./models/User');

const app = express();

// connect to MongoDB Atlas
const mongodb = process.env.MONGODB;
mongoose.connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          console.log('Error searching for user')
          return done(err);
        }
        if (!user) {
          console.log('Could not find user')
          return done(null, false, { message: "Incorrect email" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            console.log('Passwords match')
            return done(null, user);
          } else {
            console.log('Passwords do not match')
            return done(null, false, { message: "Incorrect password" });
          }
        });
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(session({ secret: 'membersonly', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', mainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;