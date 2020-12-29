var express = require('express');
var router = express.Router();

const userController = require('../controllers/userControllers');

router.get('/', function(req, res, next) {
    res.send('Welcome to GitRunning');
});

router.post('/signup', userController.create_user);



module.exports = router;