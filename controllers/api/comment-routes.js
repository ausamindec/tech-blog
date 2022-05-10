const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
      .then(db_comment_data => res.json(db_comment_data))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/', withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      commentText: req.body.commentText,
      postId: req.body.postId,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then(db_comment_data => res.json(db_comment_data))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete('/:id', withAuth, (req, res) => {
  console.log(res)
    Comment.destroy({
        where: {
          postId: req.params.id
        }
      })
        .then(db_comment_data => {
          if (!db_comment_data) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(db_comment_data);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;