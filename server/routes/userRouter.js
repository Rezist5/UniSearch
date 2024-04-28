const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Маршрут для регистрации нового пользователя
router.post('/registration', UserController.registration);

// Маршрут для аутентификации пользователя
router.post('/login', UserController.login);

// Маршрут для проверки аутентификации пользователя
router.get('/check', UserController.check);

// Маршрут для выхода из системы (logout)
router.post('/logout', UserController.logout);

module.exports = router;