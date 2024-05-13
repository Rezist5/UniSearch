const Country = require('../models/Country');
const ApiError = require('../error/ApiError');

class CountryController {

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
