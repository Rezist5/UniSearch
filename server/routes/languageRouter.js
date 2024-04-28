const { Router } = require('express');
const router = new Router();
const languageController = require('../controllers/languageController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), languageController.create);

router.get('/', languageController.getAll);

router.post('/:languageId/university/:universityId', checkRole('ADMIN'), languageController.addLanguageToUniversity);

router.delete('/:languageId/university/:universityId', checkRole('ADMIN'), languageController.removeLanguageFromUniversity);

module.exports = router;
