const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const { User } = require('./models');

const PORT = 3030;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Setting view engine to ejs
app.set('view engine', 'ejs');

//Simple route
app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/about', (req, res) => {
    res.render('pages/about');
});

app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.get('/signup', (req, res) => {
    res.render('pages/signup');
});

//Create new user (runner)
app.post('/users', async (req, res) => {
    // req.body contains an Object with firstName, lastName, email
    const { firstName, lastName, userName, email } = req.body;
    const newUser = await User.create({
        firstName,
        lastName,
        userName,
        email
    });
    
    // Send back the new user's ID in the response:
    res.json({
        id: newUser.id
    });
})

app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.get('/users/by-last-name', async (req, res) => {
    const users = await User.findAll({
        attributes: ['lastName']
    });
    res.json(users);
});

app.get('/users/:id', async (req, res) => {
    const oneUser = await User.findByPk(req.params.id);
    res.json(oneUser);
})

app.post('/users/search', async (req, res) => {
    const users = await User.findAll({
        where: {
            [Sequelize.Op.or]: [
                { 
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                }
            ]
        }
    });
    res.json(users);
});

//Updating Existing Users
app.post('/users/:id', async (req, res) => {
    const { id } = req.params;
    const updatedUser = await User.update(req.body, {
      where: {
        id
      }
    });
    
    res.json(updatedUser);
});

//Delete a User
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.destroy({
        where: {
            id
        }
    });
    res.json(deletedUser);
});

//
app.get('*', (req, res) => {
    res.status(404).send('Seems like you' + "'" + "re running the wrong way. Head back to the home page to sign-up/log-in!");
})

//listens for request
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});