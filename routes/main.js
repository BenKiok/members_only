var express = require('express');
var router = express.Router();

/* render home page */
router.get('/home', function(req, res, next) {
  res.render('main');
});

module.exports = router;