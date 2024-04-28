const Visa = require('../models/Visa');
const ApiError = require('../error/ApiError');

class VisaController {
    async create(req, res, next) {
        try {
            const { type, name, price, duration, Deadline_of_registration, countryId, description } = req.body;
            const visa = await Visa.create({ type, name, price, duration, Deadline_of_registration, countryId, description });
            return res.json(visa);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const visas = await Visa.findAll();
            return res.json(visas);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new VisaController();
