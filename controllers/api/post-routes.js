const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
    
    Post.findAll({
        attributes: [
            'id',
            'postTitle',
            'created_at',
            'postContent'
        ],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['id', 'commentText', 'postId', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['user_name']
          }
        },
        {
          model: User,
          attributes: ['user_name']
        },
      ]
    })
      .then(db_post_data => res.json(db_post_data))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'postTitle',
        'created_at',
        'postContent'
      ],
      include: [
        
        {
          model: User,
          attributes: ['user_name']
        },
        {
          model: Comment,
          attributes: ['id', 'commentText', 'postId', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['user_name']
          }
        }
      ]
    })
      .then(db_post_data => {
        if (!db_post_data) {
          res.status(404).json({ message: 'Ops! No post found with this id!' });
          return;
        }
        res.json(db_post_data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', withAuth, (req, res) => {
    Post.create({
      postTitle: req.body.postTitle,
      postContent: req.body.postContent,
      user_id: req.session.user_id
    })
      .then(db_post_data => res.json(db_post_data))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update({
        postTitle: req.body.postTitle,
        postContent: req.body.postContent
        
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(db_post_data => {
        if (!db_post_data) {
          res.status(404).json({ message: 'Ops! No post found with this id!' });
          return;
        }
        res.json(db_post_data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(db_post_data => {
        if (!db_post_data) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(db_post_data);
      })
      .catch(err => {
        console.log(err);
        // console.log(res)
        res.status(500).json(err);
      });
  });

  module.exports = router;