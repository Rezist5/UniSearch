const City = require('../models/City');
const ApiError = require('../error/ApiError');

class CityController {
    async create(req, res, next) {
        try {
            const { name, countryId } = req.body;
            const city = await City.create({ name, countryId });
            return res.json(city);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const cities = await City.findAll();
            return res.json(cities);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new CityController();
