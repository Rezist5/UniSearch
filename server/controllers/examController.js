const { Exam } = require('../models/Exam');
const ApiError = require('../error/ApiError');

class ExamController {
    async create(req, res, next) {
        try {
          const { name, maxPoints } = req.body;
          const exam = await Exam.create({ name, maxPoints });
          return res.json(exam);
        } catch (error) {
          next(ApiError.badRequest(error.message));
        }
      }
    async getAll(req, res, next) {
        try {
            const exams = await Exam.findAll();
            return res.json(exams);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const exam = await Exam.findByPk(id);
            if (!exam) {
                return next(ApiError.badRequest(`Exam with id ${id} not found`));
            }
            return res.json(exam);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new ExamController();