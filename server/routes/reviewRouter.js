const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Маршрут для создания отзыва
router.post('/:universityId', reviewController.create);


router.get('/replies', reviewController.getReplies);

// Маршрут для получения всех отзывов для указанного университета с возможностью сортировки
router.get('/:universityId/:direction', reviewController.getAllReviewsByUniversityId);

module.exports = router;
