const Portfolio = require('../models/Portfolio');
const ApiError = require('../error/ApiError');

class PortfolioController {
    async create(req, res, next) {
        try {
            const { enrolleeId } = req.body; // Изменено с userId на enrolleeId
            const { name, description } = req.body;
            const image = req.files.image;

            const newFileName = `${Date.now()}-${image.name}`;
            image.mv(`./static/portfolios/${newFileName}`);
            
            const portfolio = await Portfolio.create({ userId: enrolleeId, name, description, image: `static/portfolios/${newFileName}` }); // Изменено с userId на enrolleeId
            return res.json(portfolio);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
    
    

    async getAllByEnrolleeId(req, res, next) {
        try {
            const { enrolleeId } = req.params; // Получаем enrolleeId из параметров запроса
            console.log(enrolleeId)
            const portfolios = await Portfolio.findAll({ where: { userId: enrolleeId } }); // Ищем все портфолио с данным enrolleeId
            return res.json(portfolios); // Возвращаем найденные портфолио
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.body;
            console.log()
            const portfolio = await Portfolio.findOne({ where: { userId } }); 
            if (!portfolio) {
                return next(ApiError.notFound('Portfolio not found'));
            }
            return res.json(portfolio);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { id: userId } = req.userData; // Получаем идентификатор текущего пользователя из данных аутентификации
            const { name, description, image } = req.body;

            const portfolio = await Portfolio.findOne({ where: { id, userId } }); // Проверяем, принадлежит ли портфолио текущему пользователю
            if (!portfolio) {
                return next(ApiError.notFound('Portfolio not found'));
            }

            await portfolio.update({ name, description, image });

            return res.json(portfolio);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const { id: userId } = req.userData; // Получаем идентификатор текущего пользователя из данных аутентификации

            const portfolio = await Portfolio.findOne({ where: { id, userId } }); // Проверяем, принадлежит ли портфолио текущему пользователю
            if (!portfolio) {
                return next(ApiError.notFound('Portfolio not found'));
            }

            await portfolio.destroy();

            return res.json({ message: 'Portfolio deleted successfully' });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new PortfolioController();