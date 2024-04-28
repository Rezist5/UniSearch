const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware');

// Endpoint for creating a new portfolio
router.post('/portfolios', authMiddleware, portfolioController.create);

// Endpoint for getting all portfolios for a user
router.get('/portfolios', authMiddleware, portfolioController.getAll);

// Endpoint for getting a portfolio by ID
router.get('/portfolios/:id', authMiddleware, portfolioController.getById);

// Endpoint for updating a portfolio
router.put('/portfolios/:id', authMiddleware, portfolioController.update);

// Endpoint for deleting a portfolio
router.delete('/portfolios/:id', authMiddleware, portfolioController.delete);

module.exports = router;
