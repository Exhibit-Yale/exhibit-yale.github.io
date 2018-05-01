var express = require('express');
var router = express.Router();

const transactionModels = require('../models/transaction.js');

/* POST inserts new transaction */
router.post('/add', (req, res) => {
  const db = req.app.get('db');
  const { artId, email, phone, venmo, price} = req.body; 
  transactionModels.addTransaction(db, artId, email, phone, venmo, price)
    .then(res.status(200).send())
    .catch(err => res.status(400).send({ error: err }));
})

module.exports = router;
