var express = require('express');
var router = express.Router();

/* render home page */
router.get('/home', function(req, res, next) {
  res.render('main');
});

/* render signup page */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  res.send('signup POST route not yet completed');
});

/* render login form */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  res.send('login POST route not yet completed');
});

module.exports = router;