const ApiError = require('../error/ApiError');
const University = require('../models/University');
const City = require('../models/City');
const Country = require('../models/Country');
const Direction = require('../models/Direction');
const Language = require('../models/Language');
const Subject = require('../models/Subject');
const SubjectExam = require('../models/SubjectExam');
const Scholarship = require('../models/Scholarship');
const Exam = require('../models/Exam');
const UniversityDirection = require('../models/UniversityDirection');
const UniversityLanguage = require('../models/UniversityLanguage');


class UniversityController {
    async create(req, res, next) {
        try {
            let { cityId, name, rating, YearOfFoundation, NumberOfStudents, directions, languages } = req.body;
            const university = await University.create({ cityId, name, rating, YearOfFoundation, NumberOfStudents });

            // If directions and languages are provided, associate them with the university
            if (directions) {
                await university.addUniversityDirections(directions);
            }
            if (languages) {
                await university.addUniversityLanguages(languages);
            }

            return res.json(university);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            let { cityId, countryId, directionId, languageId, examId, limit, page, sortBy, sortOrder } = req.query;
            page = page || 1;
            limit = limit || 9;
            let offset = (page - 1) * limit;
    
            let filterOptions = {};
    
            if (cityId) {
                filterOptions.cityId = cityId;
            }
            if (countryId) {
                filterOptions['$City.countryId$'] = countryId;
            }
            if (directionId) {
                filterOptions['$Directions.id$'] = directionId;
            }
            if (languageId) {
                filterOptions['$Languages.id$'] = languageId;
            }
            if (examId) {
                filterOptions['$Subjects.Exams.id$'] = examId;
            }
    
            let includeOptions = [
                { model: City, include: [{ model: Country }] },
                { model: Direction, as: 'Directions' },
                { model: Language, as: 'Languages' },
                { model: Subject, include: [{ model: Exam }] }
            ];
    
            let orderOptions = [];
            if (sortBy === 'rating') {
                orderOptions.push(['rating', sortOrder === 'desc' ? 'DESC' : 'ASC']);
            }
            else if (sortBy === 'scholarship') {
                orderOptions.push([{ model: Scholarship }, 'value', sortOrder === 'desc' ? 'DESC' : 'ASC']);
            }
            let universities;
            if (Object.keys(filterOptions).length !== 0) {
                universities = await University.findAndCountAll({
                    where: filterOptions,
                    include: includeOptions,
                    limit,
                    offset,
                    order: orderOptions
                });
            } else {
                universities = await University.findAll({
                    limit,
                    offset,
                    order: orderOptions
                });
            }
    
            return res.json(universities);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Internal Server Error'));
        }
    }
    
    
    
    async getOne(req, res) {
        const { id } = req.params;
        const university = await University.findOne({
            where: { id },
            include: [{ model: UniversityDirection, as: 'directions' }, { model: UniversityLanguage, as: 'languages' }]
        });
        return res.json(university);
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { cityId, name, rating, YearOfFoundation, NumberOfStudents } = req.body;

            const university = await University.findByPk(id);
            if (!university) {
                return next(ApiError.notFound('University not found'));
            }

            await university.update({ cityId, name, rating, YearOfFoundation, NumberOfStudents });

            return res.json(university);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const university = await University.findByPk(id);
            if (!university) {
                return next(ApiError.notFound('University not found'));
            }

            await university.destroy();

            return res.json({ message: 'University deleted successfully' });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
    async addImage(req, res, next) {
        try {
            const { universityId } = req.params;
            const { image } = req.body;

            // Создаем новую запись изображения, связанную с идентификатором университета
            const newImage = await UniImage.create({ universityId, image });

            return res.json(newImage);
        } catch (error) {
            // Обрабатываем ошибки
            next(ApiError.badRequest(error.message));
        }
    }

}

module.exports = new UniversityController();




