const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Маршрут для создания отзыва
router.post('/reviews', authMiddleware, reviewController.create);

// Маршрут для получения всех отзывов для указанного университета с возможностью сортировки
router.get('/reviews/:universityId/:direction', reviewController.getAllReviewsByUniversityId);

module.exports = router;
