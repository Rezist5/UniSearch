const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware');

// Endpoint for creating a new portfolio
router.post('/', portfolioController.create);

// Endpoint for getting a portfolio by ID
router.get('/:enrolleeId', portfolioController.getAllByEnrolleeId);

// Endpoint for updating a portfolio
router.put('/:id', portfolioController.update);

// Endpoint for deleting a portfolio
router.delete('/:id', portfolioController.delete);

module.exports = router;
