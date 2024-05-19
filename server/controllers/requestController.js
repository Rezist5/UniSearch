const ApiError = require('../error/ApiError');
const Request = require('../models/Request');
const Answer = require('../models/Answer');
const e = require('express');

class RequestController {
    async sendRequest(req, res, next) {
        try {
            const { universityId } = req.params;
            const {enrolleeId} = req.params; 
            const { description } = req.body;
            if (!universityId || !description) {
                return next(ApiError.badRequest('Некорректные данные'));
            }
            const request = await Request.create({
                userId : enrolleeId,
                universityId: universityId,
                status: 'Pending',
                description: description
                
            });
            console.log(request)

            return res.json({ message: 'Запрос успешно отправлен', request });
        } catch (error) {
            next(ApiError.badRequest(error));
        }
    }

    async respondToRequest(req, res, next) {
        try {
            const { requestId, status } = req.params;
            const { description } = req.body;
            

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
            const {universityId} = req.params;
            const requests = await Request.findAll({
                where: {universityId : universityId}
            });
            console.log(requests)

            return res.json({ requests });
        } catch (error) {
            next(ApiError.badRequest(error));
        }
    }
}

module.exports = new RequestController();