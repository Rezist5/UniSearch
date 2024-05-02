const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');
const checkRole = require('../middleware/checkRoleMiddleware');

// Маршрут для создания стипендии
router.post('/',checkRole("ADMIN") , scholarshipController.create);

// Маршрут для получения всех стипендий
router.get('/', scholarshipController.getAll);

module.exports = router;