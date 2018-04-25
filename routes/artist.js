var express = require('express');
var router = express.Router();

const artistModels = require('../models/artist.js');

// #<{(| GET returns all art and artists |)}>#
// router.get('/', (req, res) => {
//   const db = req.app.get('db');
//
//   artModels.getAllArt(db)
//   .then(arts => {
//     console.log(arts);
//     res.json({ arts: arts });
//   })
//   .catch(err => res.status(400).send({ error: err }));
// })

/* GET returns artist details by id */
router.get('/details', (req, res) => {
  const db = req.app.get('db');

  artModels.getArtistDetails(db)
  .then(art => {
    console.log(art);
    res.json({ artist: artist });
  })
  .catch(err => res.status(400).send({ error: err }));
})
module.exports = router;
