const Country = require('../models/Country');
const ApiError = require('../error/ApiError');

class CountryController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const country = await Country.create({ name });
            return res.json(country);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const countries = await Country.findAll();
            return res.json(countries);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new CountryController();
