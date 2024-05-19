const Country = require('../models/Country');
const City = require('../models/City');
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
    async getCountryByCityId (req, res){
        const { cityId } = req.params;
        try {
          const city = await City.findOne({
            where: { id: cityId },
            include: [{ model: Country }]
          });
      
          if (!city) {
            return res.status(404).json({ message: 'City not found' });
          }
      
          res.json(city.Country);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
        }
      };
}

module.exports = new CountryController();
