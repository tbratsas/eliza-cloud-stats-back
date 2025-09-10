const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/orders', authMiddleware, ordersController.getAllOrders);

module.exports = router;
