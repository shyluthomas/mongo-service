const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const userid = req.body.userid;
  const cache = req.body.cache;
  const date = Date.parse(req.body.date);

  const newUser = new User({username, userid, cache, date});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  User.find({'userid': req.params.id})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findOneAndUpdate({'userid': req.params.id}, {upsert: true})
    .then(user => {
      user.username = req.body.username;
      user.cache = req.body.cache;
      user.date = Date.parse(req.body.date);

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;