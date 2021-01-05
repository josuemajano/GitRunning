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
    res.render('profile');
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
    console.log(req.body);
    newUser.save().then(function(User) {
        req.userName = User.userName;
        req.session.authenticated = true;
        res.redirect('/login')
        console.log(req.session);
    })
}

//Log In User
exports.userLogIn = async (req, res) => {
    const users = await User.findAll({
        where: {
            [Sequelize.Op.or]: [
                {
                    userName: req.body.userName
                }
            ]
        }
    }).then(users => {
        if (users.userName == userName) {
            req.session.userName = userName;
            req.session.userId = user.dataValues.id;
            req.session.authenticated = true;
            console.log(req.session);

            res.redirect('/profile');
        } else {
            res.redirect('/login');
            console.log('This is my session', req.session)
        }
    })
}





//Find all Runners
// app.get('/users', async (req, res) => {
//     const users = await User.findAll();
//     res.json(users);
// });

