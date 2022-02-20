const express = require('express');
const router = express.Router();

/* redirect to home page. */
router.get('/', function(req, res, next) {
  res.redirect('/home');
});

module.exports = router;