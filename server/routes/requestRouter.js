const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/send-request', authMiddleware, requestController.sendRequest);
router.post('/respond-to-request', authMiddleware, requestController.respondToRequest);
router.get('/requests', authMiddleware, requestController.getAllRequests);

module.exports = router;
