const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/:postID', async (req, res) => {
    try {

        const { comment_text } = req.body;

        const userID = req.session.user_id;

        const { postID } = req.params; 

        const request = {
            comment_text: comment_text,
            user_id: userID,
            post_id: postID            
        };

        const newComment = await Comment.create(request);

        res.send(200).json(newComment);

    }
    catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;
