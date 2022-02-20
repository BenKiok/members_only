const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  timestamp: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

messageSchema.virtual('url').get(() => {
  return '/message/' + this._id;
});

module.exports = mongoose.model('Message', messageSchema);