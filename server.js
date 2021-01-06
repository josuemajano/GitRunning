require('dotenv').config()
const express = require('express');
const app = express();
const parseurl = require('parseurl');
const Sequelize = require('sequelize');
const mustacheExpress = require('mustache-express');
const { User } = require('./models');
const { Post } = require('./models')
const routes = require('./routes/routes');
const authRoutes = require('./routes/auth');
const PORT = process.env.PORT;

//Passport configuration
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy
const session = require('express-session');

app.use(session({
    secret: 'abc123',
    resave: false,
    saveUninitialized: false
}));

// Passport config Github Strategy
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}, function(accessToken, refreshToken, profile, done){
    return done(null, profile);
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user);
})

passport.deserializeUser((user, done) => {
    console.log(user);
    done(null, user);
})

//Middleware
app.engine('mustache', mustacheExpress());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

//Setting view engine to mustache
app.set('view engine', 'mustache');
app.set('views', './views/pages');

//Routes
app.use('/', routes);
app.use('/auth', authRoutes);

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

app.get('/posts', async (req, res) => {
    const posts = await Post.findAll();
    res.json(posts);
});

//Catch all Route
app.get('*', (req, res) => {
    res.status(404).send('Seems like you' + "'" + "re running the wrong way. Head back to the home page to sign-up/log-in!");
})

//listens for request
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});