const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const checkRole = require('../middleware/checkRoleMiddleware')

// Маршрут для создания города
router.post('/', checkRole('ADMIN'), cityController.create);

// Маршрут для получения списка всех городов
router.get('/', cityController.getAll);

// Маршрут для получения информации о конкретном городе по его идентификатору
router.get('/:id', cityController.getById);

router.get('/country/:countryId', cityController.getCitiesByCountry);


module.exports = router;
