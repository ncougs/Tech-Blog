const router = require('express').Router();
const { Post, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

    //get all posts
    const postsRaw = await Post.findAll();
    const posts = postsRaw.map(post => post.get({ plain: true }))

    res.render('homepage', { posts });
});

router.get('/login', async (req, res) => {
    res.render('login');
});

router.get('/signup', async (req, res) => {
    res.render('signup');
});

router.get('/dashboard', async (req, res) => {
    //get current users posts
    const postsRaw = await Post.findAll({ where: { user_id: req.session.user_id } });
    const posts = postsRaw.map(post => post.get({ plain: true }))
    res.render('dashboard', { posts });
});

module.exports = router;