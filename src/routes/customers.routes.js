const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers.cotroller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/customers', authMiddleware, customersController.getAllCustomers);

module.exports = router;
