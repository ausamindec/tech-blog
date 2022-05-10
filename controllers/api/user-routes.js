const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
      .then(db_user_data => res.json(db_user_data))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//  /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
          id: req.params.id
        },
        include: [
            {
              model: Post,
              attributes: ['id', 'postTitle', 'postContent', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'commentText', 'created_at'],
                include: {
                  model: Post,
                  attributes: ['postTitle']
                }
            }
          ]

    })
      .then(db_user_data => {
        if (!db_user_data) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(db_user_data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// /api/users
router.post('/', (req, res) => {
    User.create({
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
    })
    .then(db_user_data => {
      req.session.save(() => {
        req.session.user_id = db_user_data.id;
        req.session.user_name = db_user_data.user_name;
        req.session.loggedIn = true;
    
        res.json(db_user_data);
      });
    });
  });

  // Login
  router.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(db_user_data => {
      if (!db_user_data) {
        res.status(400).json({ message: 'Invalid Email Id!' });
        return;
      }
  
      const validPassword = db_user_data.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = db_user_data.id;
        req.session.user_name = db_user_data.user_name;
        req.session.loggedIn = true;
  
        res.json({ user: db_user_data, message: 'Welcome, A tech blog!' });
      });
    });
  });


  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

//  /api/users/1
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
      }
    })
      .then(db_user_data => {
        if (!db_user_data[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(db_user_data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//  /api/users/1
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(db_user_data => {
        if (!db_user_data) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(db_user_data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;