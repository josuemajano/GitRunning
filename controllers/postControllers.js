const db = require('../models/');
const Post = db.Post;
const Sequelize = require('sequelize');
var userRoutes = require('../routes/routes');

//Create new Run
exports.createRun = (req, res) => {
    res.render('newrun');
};


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
    res.json({
        id: newPost.id
    });
}

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

