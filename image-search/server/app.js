const express = require('express')
const app = express()
const cors = require('cors')
const Image = require('./models/image')
const Query = require('./models/query')

app.use(cors());
app.use(express.json({extended: true}))

app.use((req, res, next) => {
  req.query.limit = Math.abs(parseInt(req.query.limit))
  req.query.page = Math.abs(parseInt(req.query.page))
  next()
})

app.get('/api/imagesearch/:term', async (req, res) => {
  const { page, limit} = req.query
  const { term } = req.params

  const skip = page - 1 >= 0 ? (page - 1) * limit : limit

  const images = await Image
    .find({snippet: {$regex: new RegExp(term), $options: 'i'}})
    .skip(skip)
    .limit(limit)
    .select('-_id -__v')

  const query = new Query({ term })
  await query.save()

  res.json(images)
})

app.post('/api/imagesearch', async (req, res) => {
  const {url, snippet, thumbnail, context} = req.body;

  const image = new Image({ url, snippet, thumbnail, context })
  await image.save()

  res.status(201).json(image)
})

app.get('/api/latest/imagesearch', async (req, res) => {
  const queries = await Query.find().sort({when: -1}).limit(8).select('-_id -__v -updatedAt')

  res.json(queries)
})

module.exports = app