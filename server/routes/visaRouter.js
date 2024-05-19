const Router = require('express')
const router = new Router()
const visaController = require('../controllers/visaController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',  visaController.create)
router.get('/', visaController.getAll)

module.exports = router