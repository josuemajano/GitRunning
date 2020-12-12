const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const { User } = require('./models');

const PORT = 3030;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//Simple route
app.get('/', (req, res) => {
    res.send('Hello Runners!');
});

//Create new user (runner)
app.post('/users', async (req, res) => {
    const { firstName, lastName, email, userName } = req.body;
    const newUser = await User.createUser({
        firstName,
        lastName,
        email,
        userName
    });
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
    const oneUser = await User.findById(req.params.id);
    res.json(oneUser);
})

app.get('/users/:id', async (req, res) => {
    try{
        const oneUser = await User.findById(req.params.id);
        res.json(oneUser);
    } catch (e) {
        console.log(e);
        res.status(404).json({
            message: 'User not found'
        });
    }
});

app.post('/users/search', async (req, res) => {
    const users = await User.findAll({
        where: {
            firstName: req.body.term,
        }
    });
    res.json(users);
});

app.post('/users/search', async (req, res) => {
    const users = await User.findAll({
        where: {
            [Sequelize.Op.or]: [
                { 
                    firstName: req.body.term,
                    lastName: req.body.term
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

app.get('*', (req, res) => {
    res.status(404).send('Seems like you' + "'" + "re running the wrong way. Head back to the home page to sign-up/log-in!");
})

//listens for request
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});