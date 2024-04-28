const Portfolio = require('../models/Portfolio');
const ApiError = require('../error/ApiError');

class PortfolioController {
    async create(req, res, next) {
        try {
            const { id: userId } = req.userData;
            const { name, description } = req.body;
            let image = '';

            if (req.file) {
                const tempPath = req.file.path;
                const targetPath = path.join(__dirname, '..', 'static/portfolios', req.file.filename + path.extname(req.file.originalname).toLowerCase());
                fs.renameSync(tempPath, targetPath); // Перемещаем файл в папку uploads

                image = targetPath; // Сохраняем путь к изображению в базе данных
            }

            const portfolio = await Portfolio.create({ userId, name, description, image });
            return res.json(portfolio);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const { id: userId } = req.userData; // Получаем идентификатор текущего пользователя из данных аутентификации
            const portfolios = await Portfolio.findAll({ where: { userId } }); // Получаем только портфолио текущего пользователя
            return res.json(portfolios);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const { id: userId } = req.userData; // Получаем идентификатор текущего пользователя из данных аутентификации
            const portfolio = await Portfolio.findOne({ where: { id, userId } }); // Получаем портфолио текущего пользователя по id
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