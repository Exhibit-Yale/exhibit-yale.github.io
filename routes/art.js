var express = require('express');
var router = express.Router();

const artModels = require('../models/art.js');

/* GET returns all art and artists */
router.get('/', (req, res) => {
  const db = req.app.get('db');

  artModels.getAllArt(db)
  .then(arts => {
    // console.log(arts);
    res.json({ arts: arts });
  })
  .catch(err => res.status(400).send({ error: err }));
})

/* GET returns art by artist id */
router.get('/byArtist', (req, res) => {
  const db = req.app.get('db');

  artModels.getArtByArtist(db, req.query.id)
  .then(arts => {
    // console.log(arts);
    res.json({ arts: arts });
  })
  .catch(err => res.status(400).send({ error: err }));
})

/* GET returns art details by id */
router.get('/details', (req, res) => {
  const db = req.app.get('db');

  artModels.getArtDetails(db)
  .then(art => {
    // console.log(art);
    res.json({ art: art });
  })
  .catch(err => res.status(400).send({ error: err }));
})
module.exports = router;
