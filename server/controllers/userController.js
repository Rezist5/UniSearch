const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BlacklistedToken } = require('../models/models');
const User = require('../models/User');
const EnrolleeInfo = require('../models/EnrolleeInfo');
const path = require('path');


const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};

class UserController {
    async registration(req, res, next) {
        const { email, password, Fullname, grade, age} = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'));
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }
        const role = 'ENROLLEE';
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email,Fullname , password: hashPassword , role});
        await EnrolleeInfo.create(grade, age, user.id);
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }
    async createAdmin(req, res, next) {
        try {
            const { email, password, fullName } = req.body;

            if (!email || !password || !fullName) {
                return next(ApiError.badRequest('Некорректные данные'));
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const admin = await User.create({
                email,
                password: hashPassword,
                fullName,
                role: 'ADMIN' 
            });

            return res.json({ message: 'Администратор успешно создан', admin });
        } catch (error) {
            next(error);
        }
    }

    async createRepresentative(req, res, next) {
        try {
            const { email, password, fullName, universityId } = req.body;

            if (!email || !password || !fullName || !universityId) {
                return next(ApiError.badRequest('Некорректные данные'));
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const representative = await User.create({
                email,
                password: hashPassword,
                fullName,
                role: 'REPRESENTATIVE' 
            });

            await RepresentativeInfo.create({
                universityId,
                userId: representative.id
            });

            return res.json({ message: 'Представитель успешно создан', representative });
        } catch (error) {
            next(error);
        }
    }
    async uploadAvatar(req, res, next) {
        try {
            if (!req.file) {
                return next(ApiError.badRequest('Файл не найден'));
            }
    
            const { filename } = req.file; 
            const user = req.user; 
    
            const avatarPath = path.join(__dirname, '..', 'static/avatars', filename);
            
            user.avatar = avatarPath;
            await user.save();
    
            return res.json({ message: 'Аватар успешно загружен', avatarPath });
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    }
    async logout(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1]; 
            await BlacklistedToken.create({ token }); 
            return res.json({ message: 'Вы успешно вышли из системы' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
