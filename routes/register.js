const router = require('express').Router();
const { handleNewUser } = require('../controller/registrationController');

router.post('/', handleNewUser);

module.exports = router;
