const express = require('express');
const router = express.Router();

const userController = require('../controllers/userControllers');
const postController = require('../controllers/postControllers');

//Home Page
router.get('/', userController.home)
//Log in Page
router.get('/login', userController.logIn)
//Sign Up Page
router.get('/signup', userController.signUp)
//Profile Page
router.get('/profile', userController.userProfile)
//Create Run
router.get('/createrun', postController.createRun)


//User Routes
router.post('/signup', userController.create_user);

//Post Routes
router.post('/createrun', postController.create_post);

module.exports = router;