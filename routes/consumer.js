var express = require('express');
var router = express.Router();

const consumerModels = require('../models/consumer.js');

/* POST inserts new consumer email */
router.post('/add', (req, res) => {
  const db = req.app.get('db');
  const { email } = req.body; 
  consumerModels.addConsumer(db, email)
    .then(res.status(200).send())
    .catch(err => res.status(400).send({ error: err }));
})
module.exports = router;
