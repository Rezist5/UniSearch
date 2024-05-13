const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Маршрут для регистрации нового пользователя
router.post('/registration', UserController.registration);

// Маршрут для аутентификации пользователя
router.post('/login', UserController.login);

// Маршрут для проверки аутентификации пользователя
router.get('/check', authMiddleware, UserController.check);

// Маршрут для выхода из системы (logout)
router.post('/logout', UserController.logout);

// Маршрут для создания админа
router.post('/createAdmin', UserController.createAdmin);

// Маршрут для создания админа представителя
router.post('/createRepresentative', UserController.createRepresentative);


module.exports = router;