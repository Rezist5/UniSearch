const { Request, Answer } = require('../models');

class RequestController {
    async sendRequest(req, res, next) {
        try {
            const { universityId, description } = req.body;
            const userId = req.userData.id; // Получаем идентификатор пользователя из данных аутентификации
    
            if (!universityId || !description) {
                return next(ApiError.badRequest('Некорректные данные'));
            }
    
            const request = await Request.create({
                userId,
                universityId,
                description,
                status: 'Pending' 
            });
    
            return res.json({ message: 'Запрос успешно отправлен', request });
        } catch (error) {
            next(ApiError.badRequest(error));
        }
    }

    async respondToRequest(req, res, next) {
        try {
            const { requestId, description, status} = req.body;

            if (!requestId || !description) {
                return next(ApiError.badRequest('Некорректные данные'));
            }

            const answer = await Answer.create({
                requestId,
                description
            });

            const request = await Request.findByPk(requestId);
            if (!request) {
                return next(ApiError.notFound('Запрос не найден'));
            }

            request.status = status;
            await request.save();

            return res.json({ message: 'Ответ успешно отправлен', answer });
        } catch (error) {
            next(ApiError.badRequest(error));
        }
    }

    async getAllRequests(req, res, next) {
        try {
            // Получаем идентификатор текущего пользователя из данных, полученных через middleware аутентификации
            const userId = req.userData.id;
    
            // Получаем параметры фильтрации из запроса
            const { status, universityId } = req.query;
            let filter = { userId }; // Добавляем условие фильтрации по идентификатору текущего пользователя
    
            // Проверяем наличие параметров фильтрации и добавляем их к объекту фильтра
            if (status) {
                filter.status = status;
            }
            if (universityId) {
                filter.universityId = universityId;
            }
    
            // Получаем список запросов с учетом фильтрации
            const requests = await Request.findAll({
                where: filter
            });
    
            return res.json({ requests });
        } catch (error) {
            next(ApiError.badRequest(error));
        }
    }
}

module.exports = new RequestController();