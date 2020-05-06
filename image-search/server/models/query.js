const {model, Schema} = require('mongoose')

module.exports = model('Query', new Schema({
  term: {type: String, required: true},
},
{ timestamps: { createdAt: 'when'} }
))