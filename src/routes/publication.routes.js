const router = require('express').Router()
const { createPublication, publicationList, deletePublication } = require('../controllers/publication.controller')


router.route('/').get(publicationList)
router.route('/').post(createPublication)
router.route('/').delete(deletePublication)

module.exports = router
