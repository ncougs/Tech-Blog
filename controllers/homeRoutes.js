const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const checkAutenticiation = require('../utils/checkAuthentication')
// const withAuth = require('../utils/auth');

router.get('/', checkAutenticiation, async (req, res) => {

    //get all posts
    const postsRaw = await Post.findAll({ order: [['post_date', 'DESC']], include: User });
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
    const postsRaw = await Post.findAll({ where: { user_id: req.session.user_id }, order: [['post_date', 'DESC']], include: User });
    const posts = postsRaw.map(post => post.get({ plain: true }))
    res.render('dashboard', { posts, logged_in: req.session.logged_in });
});

router.get('/post', checkAutenticiation, async (req, res) => {
    res.render('post', { logged_in: req.session.logged_in } );
});

router.get('/post/:postID', checkAutenticiation, async (req, res) => {

    const { postID } = req.params;

    const postRaw = await Post.findOne({ where: { id: postID } });
    const post = postRaw.get({ plain: true });

    res.render('edit-post', { post, logged_in: req.session.logged_in } );
});


router.get('/add-comment/:postID', checkAutenticiation, async (req, res) => {
    const { postID } = req.params;
    res.render('add-comment', { postID, logged_in: req.session.logged_in } );
});

router.get('/comments/:postID', checkAutenticiation, async (req, res) => {
    const { postID } = req.params;

    //get current post
    const postRaw = await Post.findOne({ where: { id: postID }, include: User });
    const post = postRaw.get({ plain: true });

    //get current posts comments
    const commentsRaw = await Comment.findAll({ where: { post_id: postID }, order: [['comment_date', 'DESC']], include: User });
    const comment = commentsRaw.map(comment => comment.get({ plain: true }))

    res.render('comments', { comment, post, logged_in: req.session.logged_in } );
});

module.exports = router;