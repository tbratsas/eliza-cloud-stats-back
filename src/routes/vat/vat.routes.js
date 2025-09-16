const express = require('express');
const router = express.Router();
const vatController = require('../../controllers/vat.ccontroller');
const authMiddleware = require('../../middleware/auth.middleware');

router.get('/vat', authMiddleware, vatController.getTotalVat);

module.exports = router;
