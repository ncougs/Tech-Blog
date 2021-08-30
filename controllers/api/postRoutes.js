const router = require('express').Router();
const { Post } = require('../../models');

router.get('/', async (req, res) => {
  try {

      const posts = await Post.findAll();
      res.status(200).json(posts);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

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

        res.status(200).json(newPost);

    }
    catch (err) {
      res.status(400).json(err);
    }
});

router.put('/:postID', async (req, res) => {
  try {

      const { postID } = req.params;

      const { title, body } = req.body;

      const request = {
          title: title,
          body: body
      };

      const updatePost = await Post.update(request, {
        where: {
          id: postID
        }
      });

      res.status(200).json(updatePost);

  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:postID', async (req, res) => {
  try {

      const { postID } = req.params;

      const deletePost = await Post.destroy({where: {id: postID}} );
      
      console.log(deletePost);

      res.status(200).json(deletePost);

  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
