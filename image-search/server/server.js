const app = require('./app');
const mongoose = require('mongoose')
require('dotenv').config()

const IMAGE_SEARCH_URI = process.env.IMAGE_SEARCH_URI
mongoose.connect(
  IMAGE_SEARCH_URI,
  { useUnifiedTopology: true,  useNewUrlParser: true },
  (err) => {
  if(!err) console.log('MongoDB connected.')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
})