const express = require('express');
const { registerUser, loginUser, changePassword } = require('../controllers/auth-controller.js');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware.js');

//all routes are related to authentication & authorization
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/change-password', authMiddleware, changePassword);

module.exports = router;