const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Маршрут для создания отзыва
router.post('/', authMiddleware, reviewController.create);

// Маршрут для получения всех отзывов для указанного университета с возможностью сортировки
router.get('/:universityId', reviewController.getAllReviewsByUniversityId);

module.exports = router;
