const db = require('../models/');
const Post = db.Post;
const Sequelize = require('sequelize');
var userRoutes = require('../routes/routes');

//Create new Run
exports.createRun = (req, res) => {
    res.render('newrun');
};

exports.editDelete = (req, res) => {
    res.render('editanddelete')
}

exports.create_post = async (req, res) => {
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
    console.log(newPost);
    res.render('/editanddelete');
}

exports.postedRun = async (req, res) => {
    const post = await Post.findAll();
    res.render('profile', {post});
};

//Delete Post
exports.deletedPost = async (req, res) => {
    const { id } = req.params;
    const deletedPost = await Post.destroy({
        where: {
            id
        }
    });
    res.json(deletedPost);
};

//Update Post
exports.updatedPost = async (req, res) => {
    const { id } = req.params;
    const updatedPost = await Post.update(req.body, {
        where: {
            id
        }
    });
    res.json(updatedPost);
};

exports.postedRun = (req, res) => {
    const Post = models.Post.build({
        title: req.body.title,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        difficulty: req.body.difficulty,
        comments: req.body.comments
    })
    post.save().then(function(Post) {
        console.log(Post);
    })
}

exports.showPosted = (req, res) => {
    const Post = models.Post.build({

    })
}