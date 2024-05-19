const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', countryController.getAll);

router.get('/by-city/:cityId', countryController.getCountryByCityId);

module.exports = router;
