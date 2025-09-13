const express = require('express');
const router = express.Router();
const salesPerCategoryController = require('../controllers/sales_per_category.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/sales_per_category', authMiddleware, salesPerCategoryController.getAllSalesPerCategory);

module.exports = router;
