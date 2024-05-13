const { Review } = require('../models/Review');
const { ReviewReply } = require('../models/ReviewReply');

class ReviewController {
    async create(req, res, next) {
        try {
            const { universityId, rating, content } = req.body;
            const userId = req.userData.id; // Получаем идентификатор пользователя из данных аутентификации
            const { reviewId } = req.body;

            // Если есть reviewId, значит это ответ на отзыв
            if (reviewId) {
                // Проверяем, существует ли указанный родительский отзыв (rootId)
                const parentReview = await Review.findByPk(reviewId);
                if (!parentReview) {
                    return res.status(404).json({ message: 'Parent review not found.' });
                }

                // Создаем ответ на отзыв и присваиваем ему rootId
                const reply = await ReviewReply.create({ userId, reviewId, rootId: parentReview.rootId , content });
                return res.json(reply);
            }

            // Если нет reviewId, значит это новый отзыв
            const review = await Review.create({ userId, universityId, rating, rootId: review.id });
            return res.json(review);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAllReviewsByUniversityId(req, res, next) {
        try {
            const { universityId, direction } = req.params;
    
            let reviews;
    
            if (direction === 'asc') {
                reviews = await Review.findAll({
                    where: { universityId },
                    order: [['rating', 'ASC']]
                });
            } else if (direction === 'desc') {
                reviews = await Review.findAll({
                    where: { universityId },
                    order: [['rating', 'DESC']]
                });
            } else {
                return res.status(400).json({ message: 'Invalid direction. Please specify "asc" or "desc".' });
            }
    
            return res.json(reviews);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
    
    // Другие методы контроллера, например, методы для получения, обновления и удаления отзывов
}

module.exports = new ReviewController();
