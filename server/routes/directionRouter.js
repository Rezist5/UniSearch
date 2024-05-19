const Router = require('express')
const router = new Router()
const directionController = require('../controllers/directionController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', directionController.create)
router.get('/', directionController.getAll)
router.post('/:directionId/university/:universityId', directionController.addDirectionToUniversity)
router.delete('/:directionId/university/:universityId',  directionController.removeDirectionFromUniversity)

module.exports = router