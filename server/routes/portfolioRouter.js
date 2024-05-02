const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware');

// Endpoint for creating a new portfolio
router.post('/', authMiddleware, portfolioController.create);

// Endpoint for getting all portfolios for a user
router.get('/', authMiddleware, portfolioController.getAll);

// Endpoint for getting a portfolio by ID
router.get('/:id', authMiddleware, portfolioController.getById);

// Endpoint for updating a portfolio
router.put('/:id', authMiddleware, portfolioController.update);

// Endpoint for deleting a portfolio
router.delete('/:id', authMiddleware, portfolioController.delete);

module.exports = router;
