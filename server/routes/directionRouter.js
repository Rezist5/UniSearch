const Router = require('express')
const router = new Router()
const directionController = require('../controllers/directionController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), directionController.create)
router.get('/', directionController.getAll)
router.post('/:directionId/university/:universityId', checkRole('ADMIN'), directionController.addDirectionToUniversity)
router.delete('/:directionId/university/:universityId', checkRole('ADMIN'), directionController.removeDirectionFromUniversity)

module.exports = router