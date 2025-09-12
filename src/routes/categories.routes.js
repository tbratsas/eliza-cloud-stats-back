const express = require('express');
const router = express.Router();
const customersController = require('../controllers/categories.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/categories', authMiddleware, customersController.getAllCategories);

module.exports = router;
