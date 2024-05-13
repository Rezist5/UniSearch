const express = require('express');
const router = express.Router();
const SubjectController = require('../controllers/SubjectController');
const checkRole = require('../middleware/checkRoleMiddleware');

// Маршрут для создания нового предмета
router.post('/', checkRole('ADMIN'), SubjectController.create);

// Маршрут для добавления требования к предмету
router.post('/:subjectId/exam',checkRole('ADMIN') , SubjectController.addExamRequirement);

// Маршрут для обновления информации о предмете
router.put('/:id',checkRole('ADMIN') ,SubjectController.update);

// Маршрут для удаления предмета
router.delete('/:id', checkRole('ADMIN'),SubjectController.remove);

// Маршрут для обновления требования к предмету
router.put('/:subjectId/exam/:examId',checkRole('ADMIN') ,SubjectController.updateExamRequirement);

// Маршрут для удаления требования к предмету
router.delete('/:subjectId/exam/:examId',checkRole('ADMIN') ,SubjectController.removeExamRequirement);

// Маршрут для получения всех предметов
router.get('/:universityId', SubjectController.getByUniversityId);

// Маршрут для получения всех предметов
router.get('/', SubjectController.getAll);


module.exports = router;
