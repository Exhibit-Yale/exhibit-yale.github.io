var express = require('express');
var router = express.Router();

const artModels = require('../models/art.js');

/* GET returns all art and artists */
router.get('/', (req, res) => {
  const db = req.app.get('db');

  artModels.getAllArt(db)
  .then(art => {
    console.log(art);
    res.json({ art: art });
  })
  .catch(err => res.status(400).send({ error: err }));
})
module.exports = router;
