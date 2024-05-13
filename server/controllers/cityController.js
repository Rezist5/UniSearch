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
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const city = await City.findByPk(id);   
            if (!city) {
                return next(ApiError.badRequest('City not found'));
            }
            return res.json(city);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
    async getCitiesByCountry(req, res, next) {
        try {
            const { countryId } = req.params;
            const cities = await City.findAll({ where: { countryId } });
            return res.json(cities);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new CityController();
