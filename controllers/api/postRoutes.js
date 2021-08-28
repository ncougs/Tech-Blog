const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try {

        const { title, body } = req.body;

        const userID = req.session.user_id;

        const request = {
            title: title,
            body: body,
            user_id: userID
        };

        const newPost = await Post.create(request);

        res.send(200).json(newPost);

    }
    catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;
