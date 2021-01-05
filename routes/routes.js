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
router.post('/login', userController.userLogIn);

//Post Routes
router.post('/createrun', postController.create_post);
router.delete('/deleterun/:id', postController.deletedPost);
router.post('/updatepost/:id', postController.updatedPost);

module.exports = router;