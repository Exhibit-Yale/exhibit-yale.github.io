var express = require('express');
var router = express.Router();

const userModels = require('../models/user.js');

/* POST user login. */
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const db = req.app.get('db');

  const empty = email === '' || password === '';
  const tooLong = email.length > 50 || password.length > 50;

  if (empty || tooLong) {
    res.status(400).json({
      error: empty ? 'Email and password fields cannot be empty' :
      'Email or password cannot be more than 50 characters'
    });
  }
  else {
    userModels.checkCredentials(db, email, password)
    .then(resp => { res.status(200).send({}) })
    .catch(err => { res.status(400).send({ error: err }) })
  }
})

/* POST register new user. */
router.post('/register', (req, res) => {
  const { name, email, password, passwordConfirmation } = req.body;
  console.log(name, email, password, passwordConfirmation);
  const db = req.app.get('db');
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (password !== passwordConfirmation) {
    res.status(400).json({
      error: '"Password" and "Confirm Password" fields must match'
    });
  }
  else if (name === '' || email === '' || password === '' || passwordConfirmation === '') {
    res.status(400).json({
      error: 'All fields must not be empty'
    })
  }
  else if (name.length > 50 || password.length > 50 || email.length > 50) {
    res.status(400).json({
      error: 'Name and password cannot be longer than 50 characters'
    })
  }
  else if (!email.match(emailRegex)) {
    res.status(400).json({
      error: 'Invalid email format'
    })
  }
  else {
    userModels.registerUser(db, name, email, password)
    .then(resp => res.status(200).send({}))
    .catch(err => res.status(400).send({ error: err }))
  }
})

module.exports = router;
