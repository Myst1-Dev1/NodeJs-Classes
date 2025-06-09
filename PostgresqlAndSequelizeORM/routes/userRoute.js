const express = require('express');
const { authentication, restrictTo } = require('../controllers/authController');
const { getAllUser } = require('../controllers/usersController');

const router = express.Router();

router.get('/', authentication, restrictTo('0'), getAllUser);

module.exports = router;