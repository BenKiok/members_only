const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');

/* render home page */
router.get('/home', message_controller.view_messages_get);

/* create new user */
router.get('/signup', user_controller.create_user_get);
router.post('/signup', user_controller.create_user_post);

/* verify existing user */
router.get('/login', user_controller.verify_user_get);
router.post('/login', user_controller.verify_user_post);

/* logout user */
router.get('/logout', user_controller.logout_user_get);

/* create new message */
router.get('/message/new', message_controller.create_message_get);
router.post('/message/new', message_controller.create_message_post);

/* change user membership */
router.get('/membership', user_controller.set_member_get);
router.post('/membership', user_controller.set_member_post);

/* add member admin status */
router.get('/admin', user_controller.set_admin_get);
router.post('/admin', user_controller.set_admin_post);

module.exports = router;