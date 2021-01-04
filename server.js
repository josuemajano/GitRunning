require('dotenv').config()
const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const { User } = require('./models');
const { Post } = require('./models')
const PORT = 3035;


// TODO: Figure out why routes and controller are not working
// var userRoutes = require('./routes/userRoutes');

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

const authRoutes = require('./routes/auth');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/auth', authRoutes);

//Setting view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views/pages');

//Simple route
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/profile', (req, res) => {
    res.render('profile',);
});

app.get('/createrun', (req, res) => {
    res.render('newrun');
});

//User Routes
// app.use('/users', userRoutes);

app.post('/signup', async (req, res) => {
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

//Posting Runs
app.post('/createrun', async (req, res) => {
    const { title, date, startTime, endTime, runType, difficulty, comments } = req.body;
    const newPost = await Post.create({
        title,
        date,
        startTime,
        endTime,
        runType,
        difficulty,
        comments
    });

    res.json({
        id: newPost.id
    });
})

app.get('/posts', async (req, res) => {
    const posts = await Post.findAll();
    res.json(posts);
});

app.post('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const updatedPost = await Post.update(req.body, {
      where: {
        id
      }
    });
    
    res.json(updatedPost);
});

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const deletedPost = await Post.destroy({
        where: {
            id
        }
    });
    res.json(deletedPost);
});

//Catch all Route
app.get('*', (req, res) => {
    res.status(404).send('Seems like you' + "'" + "re running the wrong way. Head back to the home page to sign-up/log-in!");
})

//listens for request
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});