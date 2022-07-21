const Publication = require('../models/publication.model')
const { uploadImage } = require('../utils/cloudinary')

module.exports = {
  async createPublication(req, res) {
    try {
      const { description } = req.body
      const { image } = req.files

      const imageUrl = await uploadImage(image)

      const publication = await Publication.create({ description, image: imageUrl })
      await publication.save({ validateBeforeSave: false })

      return res.status(201).json({ message: 'Publicacion creada con exito' })
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error: error.message })
    }
  },
  async publicationList(req, res) {
    try {
      const { query } = req
      const publications = await Publication.find(query)
      return res.status(201).json(publications)
    } catch (error) {
      return res.status(400).json({ message: `No se puede encontrar las publicaciones ${error}` })
    }
  },
  async deletePublication(req, res) {
    try {
      const { id } = req.body
      await Publication.findByIdAndDelete(id)
      return res.status(201).json('La publicacion se ha eliminado exitosamente')
    } catch (error) {
      console.error(error)
      return res.status(400).json({ message: 'No se pudo eliminar la publicacion', error })
    }
  }
}