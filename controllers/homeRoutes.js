const router = require('express').Router();
const { Post, User } = require('../models');
const checkAutenticiation = require('../utils/checkAuthentication')
// const withAuth = require('../utils/auth');

router.get('/', checkAutenticiation, async (req, res) => {

    //get all posts
    const postsRaw = await Post.findAll();
    const posts = postsRaw.map(post => post.get({ plain: true }))

    res.render('homepage', { posts, logged_in: req.session.logged_in });
});

router.get('/login', async (req, res) => {
    res.render('login', { logged_in: req.session.logged_in });
});

router.get('/signup', async (req, res) => {
    res.render('signup');
});

router.get('/dashboard', checkAutenticiation, async (req, res) => {
    //get current users posts
    const postsRaw = await Post.findAll({ where: { user_id: req.session.user_id } });
    const posts = postsRaw.map(post => post.get({ plain: true }))
    res.render('dashboard', { posts, logged_in: req.session.logged_in });
});

router.get('/post', checkAutenticiation, async (req, res) => {
    res.render('post', { logged_in: req.session.logged_in } );
});

module.exports = router;