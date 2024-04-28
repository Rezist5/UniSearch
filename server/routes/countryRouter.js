const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN') , countryController.create);
router.get('/', countryController.getAll);

module.exports = router;
