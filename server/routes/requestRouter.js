const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:universityId/:enrolleeId', requestController.sendRequest);

router.post('/:requestId/:status', requestController.respondToRequest);

router.get('/university/:universityId', requestController.getAllRequests);

module.exports = router;
