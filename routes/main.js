var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');
var message_controller = require('../controllers/messageController');

/* create new user */
router.get('/signup', user_controller.create_user_get);
router.post('/signup', user_controller.create_user_post);

/* verify existing user */
router.get('/login', user_controller.verify_user_get);
router.post('/login', user_controller.verify_user_post);

module.exports = router;