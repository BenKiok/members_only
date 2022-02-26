const { body, validationResult } = require('express-validator');
const { DateTime } = require('luxon');
const Message = require('../models/Message');

exports.view_messages_get = (req, res, next) => {
  Message.find({})
  .populate('author')
  .exec((err, messages) => {
    if (err) {
      return next(err);
    }
    res.render('main', {messages: messages});
  });
}

exports.create_message_get = (req, res, next) => {
  res.render('new-message');
}

exports.create_message_post = [
  body('title').trim().isLength({min:1}).escape(),
  body('content').trim().isLength({min:1}).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      res.render('new-message', {userInput: req.body});
    } else {
      let date = DateTime.now().toFormat("DDD 'at' t");

      const message = new Message({
        title: req.body.title,
        content: req.body.content,
        timestamp: date,
        author: res.locals.currentUser
      }).save((err, message) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      })
    }
  }
]

exports.delete_message_get = (req, res, next) => {
  Message.findById(req.params.id, (err, message) => {
    if (err) {
      return next(err);
    }
    res.render('delete-message', {message: message});
  });
}

exports.delete_message_post = (req, res, next) => {
  Message.findByIdAndDelete(req.params.id, err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
}