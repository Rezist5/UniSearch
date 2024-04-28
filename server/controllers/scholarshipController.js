const Scholarship = require('../models/Scholarship');
const ApiError = require('../error/ApiError');

class ScholarshipController {
    async create(req, res, next) {
        try {
            const { name, requirements, universityId, value } = req.body;
            const scholarship = await Scholarship.create({ name, requirements, universityId, value });
            return res.json(scholarship);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const scholarships = await Scholarship.findAll();
            return res.json(scholarships);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }
}

module.exports = new ScholarshipController();
