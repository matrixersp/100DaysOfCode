const {model, Schema} = require('mongoose');

module.exports = model('Image', new Schema({
  url: {type: String, required: true},
  snippet: { type: String, required: true},
  thumbnail: {type: String, required: true},
  context: {type: String, required: true}
}));