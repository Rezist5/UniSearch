const Direction = require('../models/Direction')
const ApiError = require('../error/ApiError');

class directionController {
    async create(req, res) {
        try{
            const {name} = req.body
            const direction = await Direction.create({name})
            return res.json(direction)
        }catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res) {
        try{
            const directions = await Direction.findAll()
            return res.json(directions)
        }catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
    async addDirectionToUniversity(req, res, next) {
        try {
            const { universityId, directionId } = req.params;
            const university = await University.findByPk(universityId);
            const direction = await Direction.findByPk(directionId);

            if (!university || !direction) {
                return next(ApiError.notFound('University or Direction not found'));
            }

            await university.addDirection(direction);

            return res.json({ message: 'Direction added to University successfully' });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async removeDirectionFromUniversity(req, res, next) {
        try {
            const { universityId, directionId } = req.params;
            const university = await University.findByPk(universityId);
            const direction = await Direction.findByPk(directionId);

            if (!university || !direction) {
                return next(ApiError.notFound('University or Direction not found'));
            }

            await university.removeDirection(direction);

            return res.json({ message: 'Direction removed from University successfully' });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

}

module.exports = new directionController()