const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'), cityController.create);
router.get('/', cityController.getAll);

module.exports = router;
