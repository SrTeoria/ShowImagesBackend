const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

async function uploadImage(image) {
  return new Promise((resolve, reject) => {
    const stream_uploader = cloudinary.uploader.upload_stream({
      folder: 'foo'
    }, (error, result) => {
      if (error) {
        reject(error)
      }

      resolve(result.url)
    })

    streamifier.createReadStream(image.data).pipe(stream_uploader)
  })
}

module.exports = {
  uploadImage
}
