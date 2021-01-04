const db = require('../models/');
const User = db.User;
const Sequelize = require('sequelize');
var userRoutes = require('../routes/routes');

//Home
exports.home = (req, res) => {
    res.render('index');
};

//Log In
exports.logIn = (req, res) => {
    res.render('login');
};

//Sign Up
exports.signUp = (req, res) => {
    res.render('signup');
};

//Profile
exports.userProfile = (req, res) => {
    res.render('profile',);
};

// //Create new user (runner)
exports.create_user = async (req, res) => {
    const { firstName, lastName, email, userName } = req.body;
    const newUser = await User.create({
        firstName,
        lastName,
        email,
        userName
    });

    res.json({
        id: newUser.id
    });
}

//Find all Runners
// app.get('/users', async (req, res) => {
//     const users = await User.findAll();
//     res.json(users);
// });

