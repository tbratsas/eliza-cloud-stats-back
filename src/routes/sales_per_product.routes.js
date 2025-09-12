const express = require('express');
const router = express.Router();
const salesPerProductController = require('../controllers/sales_per_product.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/sales_per_product', authMiddleware, salesPerProductController.getAllSalesPerProduct);

module.exports = router;
