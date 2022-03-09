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
    messages.forEach(message => {
      message.title = decodeText(message.title);
      message.content = decodeText(message.content);
    });

    res.render('main', {messages: reverseArr(messages)});
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
  Message.findById(req.params.id)
  .populate('author') 
  .exec((err, message) => {
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

/* modifying functions for message display */
function decodeText(string) {
  return string.replace(/&quot;/g, '\"')  
               .replace(/&amp;/g, '&')
               .replace(/&#x27;/g, '\'');
}
function reverseArr(arr) {
  let reversedArr = [];
  arr.forEach(element => {
    reversedArr.unshift(element);
  });
  return reversedArr;
}