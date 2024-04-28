const Language = require('../models/Language');
const UniversityLanguage = require('../models/UniversityLanguage');
const ApiError = require('../error/ApiError');

class LanguageController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const language = await Language.create({ name });
            return res.json(language);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const languages = await Language.findAll();
            return res.json(languages);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async addLanguageToUniversity(req, res, next) {
        try {
            const { universityId, languageId } = req.params;
            const university = await University.findByPk(universityId);
            const language = await Language.findByPk(languageId);

            if (!university || !language) {
                return next(ApiError.notFound('University or Language not found'));
            }

            // Добавляем связь между университетом и языком
            await university.addLanguage(language);

            return res.json({ message: 'Language added to University successfully' });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async removeLanguageFromUniversity(req, res, next) {
        try {
            const { universityId, languageId } = req.params;
            const university = await University.findByPk(universityId);
            const language = await Language.findByPk(languageId);

            if (!university || !language) {
                return next(ApiError.notFound('University or Language not found'));
            }

            // Удаляем связь между университетом и языком
            await university.removeLanguage(language);

            return res.json({ message: 'Language removed from University successfully' });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new LanguageController();
