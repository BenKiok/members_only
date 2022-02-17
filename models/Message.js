var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  timestamp: {type: Date, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

messageSchema.virtual('url').get(() => {
  return '/message/' + this._id;
});

module.exports = mongoose.model('Message', messageSchema);