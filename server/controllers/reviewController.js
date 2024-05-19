const Review = require('../models/Review');
const ReviewReply = require('../models/ReviewReply');
const ApiError = require('../error/ApiError');
const University = require('../models/University');
const { Op } = require('sequelize');

class ReviewController {
    async create(req, res, next) {
        try {
            const { rating, content, parentId } = req.body;
            const universityId = req.params.universityId;
            const userId = req.userData.id;
    
            let review;
            // If there's a parentId, this is a reply to another review
            if (parentId) {
                // Create a reply and assign it the parentId
                const reply = await ReviewReply.create({ userId, parentId, content });
                return res.json(reply);
            }
    
            // If there's no parentId, this is a new review
            review = await Review.create({ userId, universityId, rating, content });
            
            // Calculate the new average rating for the university
            const reviews = await Review.findAll({ where: { universityId } });
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRating / reviews.length;

            // Update the university's rating
            await University.update({ rating: averageRating }, { where: { id: universityId } });     
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
    async getReplies(req, res) {
        let reviewIds = req.body;

        try {
            const replies = await ReviewReply.findAll({
                where: {
                    parentId: {
                        [Op.in]: reviewIds
                    }
                }
            });
    
            const allReplies = replies.map(reply => reply.toJSON());
    
            return res.json(allReplies);
                
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    
    
    
    
    
    
    // Другие методы контроллера, например, методы для получения, обновления и удаления отзывов
}

module.exports = new ReviewController();
