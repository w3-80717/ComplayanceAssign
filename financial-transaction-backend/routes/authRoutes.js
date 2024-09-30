const express = require('express');
const { login, register, signup } = require('../controllers/authController');
const router = express.Router();


router.post('/login', login);


router.post('/register', register);

router.post('/signup', signup);


module.exports = router;
