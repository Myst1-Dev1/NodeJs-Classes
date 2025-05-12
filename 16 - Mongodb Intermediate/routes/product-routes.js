const express = require('express');
const { insertSampleProducts, getProductsStats, getProductAnalysis } = require('../controllers/product-controller');

const router = express.Router();

router.post('/add', insertSampleProducts);
router.get('/stats', getProductsStats);
router.get('/analysis', getProductAnalysis);

module.exports = router;