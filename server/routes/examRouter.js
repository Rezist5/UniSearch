const express = require('express');
const router = express.Router();
const ExamController = require('../controllers/ExamController');
const checkRole = require('../middleware/checkRoleMiddleware')


// Маршрут для создания нового экзамена
router.post('/', checkRole('ADMIN') , ExamController.create);

router.get('/', ExamController.getAll);  

router.get('/:id', ExamController.getById);


module.exports = router;
