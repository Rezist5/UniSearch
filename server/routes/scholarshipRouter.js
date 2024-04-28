const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');
const checkRole = require('../middleware/checkRoleMiddleware');

// Маршрут для создания стипендии
router.post('/scholarships',checkRole("ADMIN") , scholarshipController.create);

// Маршрут для получения всех стипендий
router.get('/scholarships', scholarshipController.getAll);

module.exports = router;