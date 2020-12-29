var user = require('../models/user');
var userRoutes = require('../routes/userRoutes');


//var primaryId = 1;

//Create new user (runner)
exports.create_user = async (req, res) => {
    const { firstName, lastName, userName, email } = req.body;
    const newUser = await User.create({
        firstName,
        lastName,
        userName,
        email
    });

    res.json({
        id: newUser.id
    });
}

