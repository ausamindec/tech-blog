const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        // use a id from the session 
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'postTitle',
        'created_at',
        'postContent'
      ],
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
        }
      ]
    })
      .then(db_post_Data => {
        const posts = db_post_Data.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', withAuth, (req, res) => {
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
        }
      ]
    })
      .then(db_post_Data => {
        console.log(db_post_Data)
        if (!db_post_Data) {
          res.status(404).json({ message: 'Ops! No post found with this id!' });
          return;
        }
  
        const post = db_post_Data.get({ plain: true });

        res.render('edit-post', {
            post,
            loggedIn: true
            });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/create/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'postTitle',
        'created_at',
        'postContent'
      ],
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
        }
      ]
    })
      .then(db_post_data => {
        const posts = db_post_data.map(post => post.get({ plain: true }));
        res.render('create-post', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;