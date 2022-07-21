const { model, Schema } = require('mongoose')

const publicationSchema = new Schema({
  description: String,
  image: String
}, {
  timestamps: true,
})

const Publication = model('Publication', publicationSchema)

module.exports = Publication