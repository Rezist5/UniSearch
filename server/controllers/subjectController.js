const Subject = require('../models/Subject');
const SubjectExam = require('../models/SubjectExam');

class SubjectController {
  async create(req, res, next) {
    try {
      const { name, exams } = req.body;

      // Создание предмета
      const subject = await Subject.create({ name });

      return res.json(subject);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res, next) {
    try {
      const subjects = await Subject.findAll();
      return res.json(subjects);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
  async addExamRequirement(req, res, next) {
    try {
      const { subjectId } = req.params;
      const { examId, minPoints } = req.body;

      const subject = await Subject.findByPk(subjectId);
      if (!subject) {
        return next(ApiError.notFound('Subject not found'));
      }

      const examRequirement = await SubjectExam.create({ SubjectId: subjectId, ExamId: examId, minPoints });
      return res.json(examRequirement);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
  
      const subject = await Subject.findByPk(id);
      if (!subject) {
        return next(ApiError.notFound('Subject not found'));
      }
  
      await subject.update({ name, description });
  
      return res.json(subject);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  
  async remove(req, res, next) {
    try {
      const { id } = req.params;
  
      const subject = await Subject.findByPk(id);
      if (!subject) {
        return next(ApiError.notFound('Subject not found'));
      }
  
      await subject.destroy();
  
      return res.json({ message: 'Subject deleted successfully' });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  
  async updateExamRequirement(req, res, next) {
    try {
      const { subjectId, examId } = req.params;
      const { minPoints } = req.body;
  
      const examRequirement = await SubjectExam.findOne({
        where: { SubjectId: subjectId, ExamId: examId }
      });
      if (!examRequirement) {
        return next(ApiError.notFound('Exam requirement not found'));
      }
  
      await examRequirement.update({ minPoints });
  
      return res.json(examRequirement);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  
  async removeExamRequirement(req, res, next) {
    try {
      const { subjectId, examId } = req.params;
  
      const examRequirement = await SubjectExam.findOne({
        where: { SubjectId: subjectId, ExamId: examId }
      });
      if (!examRequirement) {
        return next(ApiError.notFound('Exam requirement not found'));
      }
  
      await examRequirement.destroy();
  
      return res.json({ message: 'Exam requirement deleted successfully' });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getByUniversityId(req, res, next) {
    try {
        const { universityId } = req.params;

        const university = await University.findByPk(universityId, {
            include: [{ model: Subject }] 
        });

        if (!university) {
            return next(ApiError.notFound('University not found'));
        }

        const subjects = university.Subjects;
        return res.json(subjects);
    } catch (error) {
        next(ApiError.internal(error.message));
    }
}
}

module.exports = new SubjectController();