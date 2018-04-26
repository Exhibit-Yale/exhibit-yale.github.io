getAllArtists = (db) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT id, name, picture_link as pfp FROM artist ORDER BY id'
    ).then(resp => {
      resolve(resp.rows);
    })
    .catch(err => reject('Query to get tasks failed'));
  })
}

getArtistDetails = (db, artistId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT id, name, email, insta, picture_link as pfp, bio FROM artist WHERE artist.id = $1',
      [artistId]
    ).then(resp => {
      resolve(resp.rows[0]);
    })
    .catch(err => reject('Query to get tasks failed'));
  })
}

module.exports = {
  getAllArtists,
  getArtistDetails
}
