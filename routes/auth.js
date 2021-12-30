const router = require('express').Router();
const { handleLogin } = require('../controller/authController');

router.post('/', handleLogin);

module.exports = router;
