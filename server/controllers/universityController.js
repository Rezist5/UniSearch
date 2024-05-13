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
            let { cityId, name, rating, YearOfFoundation, NumberOfStudents, directions, languages, price } = req.body;
    
            // Создаем университет
            const university = await University.create({ cityId, name, rating, YearOfFoundation, NumberOfStudents, price });
    
            // Если переданы направления, находим их в базе данных и связываем с университетом через модель UniversityDirection
            if (directions) {
                const foundDirections = await Direction.findAll({ where: { id: directions } });
                await university.addDirections(foundDirections);
            }
    
            // Если переданы языки, находим их в базе данных и добавляем к университету
            if (languages) {
                const foundLanguages = await Language.findAll({ where: { id: languages } });
                await university.setLanguages(foundLanguages);
            }
    
            return res.json(university);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    
    

    async getAll(req, res, next) {
        try {
            let { directionId, countryId, subjectId, page, limit, sortOrder } = req.query;
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 9;
            let offset = (page - 1) * limit;
            let universities;
    
            if (!directionId && !countryId && !subjectId) {
                universities = await University.findAndCountAll({limit, offset, order: [['name', sortOrder || 'ASC']]});
            }
            if (directionId && !countryId && !subjectId) {
                universities = await University.findAll({
                    include: [{
                        model: Direction,
                        as: 'directions',
                        through: { attributes: [] },
                        where: { id: directionId }
                    }],
                    limit, offset, order: [['name', sortOrder || 'ASC']]
                });
            }
            if (!directionId && countryId && !subjectId) {
                universities = await University.findAll({
                    include: [{
                        model: City,
                        as: 'City',
                        where: { countryId },
                        attributes: []
                    }],
                    limit, offset, order: [['name', sortOrder || 'ASC']]
                });
            }
            if (!directionId && !countryId && subjectId) {
                universities = await University.findAll({
                    include: [{
                        model: Subject,
                        as: 'subjects',
                        where: { id: subjectId },
                        attributes: []
                    }],
                    limit, offset, order: [['name', sortOrder || 'ASC']]
                });
            }
            if (directionId && countryId && !subjectId) {
                universities = await University.findAll({
                    include: [
                        {
                            model: Direction,
                            as: 'directions',
                            through: { attributes: [] },
                            where: { id: directionId }
                        },
                        {
                            model: City,
                            as: 'City',
                            where: { countryId },
                            attributes: []
                        }
                    ],
                    limit, offset, order: [['name', sortOrder || 'ASC']]
                });
            }
            if (directionId && !countryId && subjectId) {
                universities = await University.findAll({
                    include: [
                        {
                            model: Direction,
                            as: 'directions',
                            through: { attributes: [] },
                            where: { id: directionId }
                        },
                        {
                            model: Subject,
                            as: 'subjects',
                            where: { id: subjectId },
                            attributes: []
                        }
                    ],
                    limit, offset, order: [['name', sortOrder || 'ASC']]
                });
            }
            if (!directionId && countryId && subjectId) {
                universities = await University.findAll({
                    include: [
                        {
                            model: City,
                            as: 'City',
                            where: { countryId },
                            attributes: []
                        },
                        {
                            model: Subject,
                            as: 'subjects',
                            where: { id: subjectId },
                            attributes: []
                        }
                    ],
                    limit, offset, order: [['name', sortOrder || 'ASC']]
                });
            }
            if (directionId && countryId && subjectId) {
                universities = await University.findAll({
                    include: [
                        {
                            model: Direction,
                            as: 'directions',
                            through: { attributes: [] },
                            where: { id: directionId }
                        },
                        {
                            model: City,
                            as: 'City',
                            where: { countryId },
                            attributes: []
                        },
                        {
                            model: Subject,
                            as: 'subjects',
                            where: { id: subjectId },
                            attributes: []
                        }
                    ],
                    limit, offset, order: [['name', sortOrder || 'ASC']]
                });
            }
    
            return res.json(universities);
        } catch (err) {
            console.log(err);
            next(err);
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
            const { images } = req.body;
    
            // Создаем новую запись для каждого изображения, связанную с идентификатором университета
            const newImages = await Promise.all(images.map(image => UniImage.create({ universityId, image })));
    
            return res.json(newImages);
        } catch (error) {
            // Обрабатываем ошибки
            next(ApiError.badRequest(error.message));
        }
    }
    
    
    
    async getAllImagesByUniversityId(req, res, next) {
        try {
            const { universityId } = req.params;
    
            const images = await UniImage.findAll({ where: { universityId } });
    
            return res.json(images);
        } catch (error) {
            // Обрабатываем ошибки
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new UniversityController();




