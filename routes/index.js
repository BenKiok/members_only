var express = require('express');
var router = express.Router();

/* redirect to home page. */
router.get('/', function(req, res, next) {
  res.redirect('/home');
});

/* render home page */
router.get('/home', function(req, res, next) {
  res.render('main');
});

module.exports = router;