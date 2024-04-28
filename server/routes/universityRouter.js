const Router = require('express')
const router = new Router()
const UniversityController = require('../controllers/universityController')
const checkRole = require('../middleware/checkRoleMiddleware');


// Маршрут для создания университета
router.post('/', checkRole('ADMIN'), UniversityController.create);

// Маршрут для получения списка всех университетов с возможностью фильтрации и пагинации
router.get('/', UniversityController.getAll);  

// Маршрут для получения информации об одном университете по его идентификатору
router.get('/:id', UniversityController.getOne);

// Маршрут для обновления информации об университете по его идентификатору
router.put('/:id', checkRole('ADMIN'), UniversityController.update);

// Маршрут для удаления университета по его идентификатору
router.delete('/:id', checkRole('ADMIN'), UniversityController.delete);

// Маршрут для добавления изображения к университету
router.post('/:universityId/image', checkRole('ADMIN'), UniversityController.addImage);

module.exports = router;